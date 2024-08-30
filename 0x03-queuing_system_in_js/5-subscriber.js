import redis from 'redis'

const subscriber = rediscreateClient();

subscriber.on("error", (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

subcriberon("connect", () => {
    console.log("Redis client connected to the server");
});

subscriber.subscribe("holberton school channel");

subcriber.on("message", (channel, message) => {
    if (channel == "holberton school channel") {
	if (message == "KILL_SERVER") {
	    subcriber.unsubcribe();
	    subcriber.quit();
	}
	console.log(message);
    }
});
