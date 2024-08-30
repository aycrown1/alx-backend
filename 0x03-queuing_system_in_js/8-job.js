import kue from 'kue';

function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  jobs.forEach(({ phoneNumber, message }) => {
    const job = queue.create('push_notification_code_3', { phoneNumber, message })
      .save((error) => {
        if (error) {
          console.error('Error creating job:', error);
        } else {
          console.log(`Notification job created: ${job.id}`);
        }
      });

    job
      .on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
      })
      .on('failed', (errorMessage) => {
        console.log(`Notification job ${job.id} failed: ${errorMessage}`);
      })
      .on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });
  });
}

export default createPushNotificationsJobs;
