import kue from "kue";

const queue = kue.createQueue();
const jobData = {
    phoneNumber: "+234-469-8904",
    message: "Hello" };

const job = queue.create("push_notification_code", jobData).save((err) => {
  if (!err) {
    console.log(`Notication job created: ${job.id}`);
  }
});

job.on("complete", (result) => {
  console.log("Notification job completed");
});

job.on("failed", (errorMessage) => {
  console.log("Notification job failed");
});
