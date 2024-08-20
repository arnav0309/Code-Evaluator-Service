//import Docker from 'dockerode'

import createDockerContainer from './containerFactory'
//import { testCases } from '../types/testCases'
import { CPP_IMAGE } from '../utils/constants'
import decodeDockerStream from './dockerHelper'
import pullImage from './toPullImage'

async function runCpp( code: string, inputData: string){
    const rawLogBuffer: Buffer[] = []


    await pullImage(CPP_IMAGE)

    console.log("Initialising a new cpp docker container")
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputData.replace(/'/g, `'\\"`)}' | ./main`
    console.log(runCommand)
    const cppDockerContainer = await createDockerContainer(CPP_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ])


    // starting / booting the corresponding docker container
    await cppDockerContainer.start()

    console.log("Started the docker container")

    const loggerStream = await cppDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true // whether the logs are streamed or returned as a string
    })

    // Attach events on the stream objects to start and stop reading
    loggerStream.on('data', (chunk) => {
        rawLogBuffer.push(chunk)
    })

    

    await new Promise((res)=>{
        loggerStream.on('end', () => {
            console.log(rawLogBuffer)
            const completeBuffer = Buffer.concat(rawLogBuffer)
            const decodedStream = decodeDockerStream(completeBuffer)
            console.log(decodedStream)
            console.log(decodedStream.stdout)
    
        })
    })
    await cppDockerContainer.kill()  // to remove the container when the work is done
}       

export default runCpp