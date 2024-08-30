import redis from 'redis';
import util from 'util';

const client = redis.createClient();
const redisGet = util.promisify(client.get).bind(client);

client.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err}`);
});

client.on('connect', () => {
    console.log('Redis client connected to the server');
})

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
    try {
	const outputVal = await redisGet(schoolName);
	console.log(outputVal);
    } catch (error) {
	throw error;
    }
}

displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");
