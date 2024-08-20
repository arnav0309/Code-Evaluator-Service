import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefinition";
import { submissionPayload } from "../types/submissionPayload";
import runCpp from "../containers/runCPP";

export default class submissionJob implements IJob {
    name: string
    payload: Record<string, submissionPayload>
    constructor(payload: Record<string, submissionPayload>){
        this.payload = payload
        this.name = this.constructor.name
    }
    handle = async ( job?: Job) => {
        console.log("Handler of the job called")
        console.log(this.payload)
        if(job) {
            const key = Object.keys(this.payload)[0]
            console.log(this.payload[key].language)
            if(this.payload[key].language === 'CPP') {
                const response = await runCpp(this.payload[key].code, this.payload[key].inputCase)
                console.log("Evaluated response is", response)
            }
        }
    }
    failed = ( job?: Job) =>{
        console.log("job is failed")
        if(job){
            console.log(job.id)
        }
    }
    
}