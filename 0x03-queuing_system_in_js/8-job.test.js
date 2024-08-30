import kue from 'kue';
import { expect } from 'chai';
import createPushNotificationsJobs from './8-job.js';

const testQueue = kue.createQueue();

describe('createPushNotificationsJobs', function() {
  before((done) => {
    kue.testMode.enter();
    testQueue.client.flushdb(done);
  });

  after((done) => {
    kue.testMode.exit();
    done();
  });

  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, testQueue)).to.throw('Jobs is not an array');
  });

  it('should create jobs and add them to the queue', (done) => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
      }
    ];

    createPushNotificationsJobs(jobs, testQueue);

    setTimeout(() => {
      const queueData = testQueue.client.lrange('q:push_notification_code_3', 0, -1);
      queueData.then((jobs) => {
        expect(jobs).to.have.lengthOf(2);
        done();
      });
    }, 100);
  });
});
