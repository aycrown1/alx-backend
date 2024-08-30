import express from "express";
import redis from "redis";
import util from "util";

const app = express();
const port = 1245;

const listProducts = [
  { Id: 1, name: "Suitcase 250", price: 50, stock: 4 },
  { Id: 2, name: "Suitcase 450", price: 100, stock: 10 },
  { Id: 3, name: "Suitcase 650", price: 350, stock: 2 },
  { Id: 4, name: "Suitcase 1050", price: 550, stock: 5 },
];

function getItemById(id) {
  return listProducts.find((item) => item.Id === id);
}

const client = redis.createClient();
const redisGet = util.promisify(client.get).bind(client);
const redisSet = util.promisify(client.set).bind(client);

async function reserveStockById(itemId, stock) {
  await redisSet(itemId, stock);
}

async function getCurrentReservedStockById(itemId) {
  try {
    const stock = await redisGet(itemId);
    return stock ? parseInt(stock, 10) : 0;
  } catch (error) {
    throw error;
  }
}

app.get("/list_products", (req, res) => {
  const products = listProducts.map((product) => ({
    itemId: product.Id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
  }));
  res.json(products);
});

app.get("/list_products/:itemId", async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);
  if (!product) {
    return res.json({ status: "Product not found" });
  }
  const reservedStock = await getCurrentReservedStockById(itemId);
  const currentQuantity = product.stock - reservedStock;
  const productWithStock = {
    itemId: product.Id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
    currentQuantity,
  };
  res.json(productWithStock);
});

app.get("/reserve_product/:itemId", async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);
  if (!product) {
    return res.json({ status: "Product not found" });
  }
  const reservedStock = await getCurrentReservedStockById(itemId);
  const availableStock = product.stock - reservedStock;
  if (availableStock < 1) {
    return res.json({ status: "Not enough stock available", itemId });
  }
  await reserveStockById(itemId, reservedStock + 1);
  res.json({ status: "Reservation confirmed", itemId });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
