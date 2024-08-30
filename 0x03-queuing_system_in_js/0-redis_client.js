import redis from 'redis';

const client = redis.createClient();


client.on('error', ('error', (err) => {
    console.error(`Redis client not connected to the server: ${err}`);
});

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

