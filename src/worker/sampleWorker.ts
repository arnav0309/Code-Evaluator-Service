import { Job, Worker } from "bullmq"

import sampleJob from "../jobs/sampleJob"
import redisConnection from "../config/redisConfig";

export default function sampleWorker(queueName: string){
    new Worker(
        queueName,
        async (job: Job) =>{
            if(job.name === 'sampleJob') {

                const sampleJobInstance = new sampleJob(job.data);
                sampleJobInstance.handle(job)
            }
        },
        {
            connection: redisConnection
        }
    )
}