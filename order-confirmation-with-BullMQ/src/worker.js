import {Worker} from 'bullmq';
import {emailQueue, connection} from './queue.js';

const worker = new Worker(
    'emails',
     async job => {
        console.log(`Processing job ${job.name}, ${job.id} with data:`, job.data);
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(`Email sent for order ${job.data.orderId}`);
    }, 
    {connection}
);

worker.on('completed', job => {
    console.log(`Job ${job.name}, ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`Job ${job.name}, ${job.id} has failed with error: ${err.message}`);
});

