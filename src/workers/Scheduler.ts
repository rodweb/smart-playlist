import { Queue, QueueScheduler } from 'bullmq';
import * as process from 'process';
import env from '../environment';

const queueName = env.mq.queues.recentTrackFetcher;
const scheduler = new QueueScheduler(queueName);
const queue = new Queue(queueName);

// Repeat job every 10 seconds but no more than 100 times
(async () => {
  await queue.add(
    'fetch_recent_track',
    {},
    {
      repeat: {
        every: 10 * 1000,
      },
    }
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
