import express from "express";
import redis from "redis";
import kue from "kue";
import util from "util";

const app = express();
const port = 1245;

// Initialize Redis client and promisify its methods
const redisClient = redis.createClient();
const redisGet = util.promisify(redisClient.get).bind(redisClient);
const redisSet = util.promisify(redisClient.set).bind(redisClient);

// Initialize Kue queue
const queue = kue.createQueue();

// Initialize reservation settings
let reservationEnabled = true;
const initialSeats = 50;

// Function to reserve seats in Redis
async function reserveSeats(number) {
  await redisSet("available_seats", number);
}

// Function to get current available seats
async function getCurrentAvailableSeats() {
  try {
    const seats = await redisGet("available_seats");
    return seats ? parseInt(seats, 10) : 0;
  } catch (error) {
    throw error;
  }
}

// Set initial available seats
await reserveSeats(initialSeats);

// Route to get available seats
app.get("/available_seats", async (req, res) => {
  try {
    const availableSeats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats: availableSeats.toString() });
  } catch (error) {
    res.status(500).json({ status: "Error retrieving available seats" });
  }
});

// Route to reserve a seat
app.get("/reserve_seat", async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: "Reservations are blocked" });
  }
  const job = queue.create("reserve_seat").save((err) => {
    if (err) {
      return res.json({ status: "Reservation failed" });
    }
    res.json({ status: "Reservation in process" });
  });
  
  job.on("complete", () => {
    console.log(`Seat reservation job ${job.id} completed`);
  }).on("failed", (errorMessage) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});

// Route to process the queue
app.get("/process", async (req, res) => {
  res.json({ status: "Queue processing" });

  queue.process("reserve_seat", async (job, done) => {
    try {
      let availableSeats = await getCurrentAvailableSeats();
      if (availableSeats > 0) {
        await reserveSeats(availableSeats - 1);
        if (availableSeats - 1 === 0) {
          reservationEnabled = false;
        }
        done();
      } else {
        done(new Error("Not enough seats available"));
      }
    } catch (error) {
      done(error);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
