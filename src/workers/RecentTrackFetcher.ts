import { Worker } from 'bullmq';
import env from '../environment';

const queueName = env.mq.queues.recentTrackFetcher;

const worker = new Worker(queueName, async (job) => {
  // Will print { foo: 'bar'} for the first job
  // and { qux: 'baz' } for the second.
  console.log(job.data);
  console.log(process.memoryUsage());
});

worker.on('completed', (job) => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});
