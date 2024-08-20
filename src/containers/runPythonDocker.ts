//import Docker from 'dockerode'

import createDockerContainer from './containerFactory'
//import { testCases } from '../types/testCases'
import { PYTHON_IMAGE } from '../utils/constants'
import decodeDockerStream from './dockerHelper'

async function runPython( code: string, inputData: string){
    const rawLogBuffer: Buffer[] = []

    console.log("Initialising a new python docker container")
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputData.replace(/'/g, `'\\"`)}' | python3 test.py`
    console.log(runCommand);
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']); 
    const pythonDockerContainer = await createDockerContainer(PYTHON_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ])


    // starting / booting the corresponding docker container
    await pythonDockerContainer.start()

    console.log("Started the docker container")

    const loggerStream = await pythonDockerContainer.logs({
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
    await pythonDockerContainer.kill()  // to remove the container when the work is done
}       

export default runPython