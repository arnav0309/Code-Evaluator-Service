import express from 'express'
import serverConfig from './config/serverConfig'
import apiRouter from './routes'
import bodyParser from 'body-parser'
// import sampleQueueProducer from './producers/sampleQueueProducer'
 import sampleWorker from './worker/sampleWorker'
import runPython from './containers/runPythonDocker'

const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use('/api',apiRouter)

app.listen(serverConfig.PORT,() => {
    console.log(`server is running on port: ${serverConfig.PORT}`)

     sampleWorker('sampleQueue')

    // sampleQueueProducer('sampleJob',{
    //     name: "Anand",
    //     company: "Freecharge",
    //     position: "SDE",
    //     location: "Remote"
    // },2)
    // sampleQueueProducer('sampleJob',{
    //     name: "Rohit",
    //     company: "Goldman",
    //     position: "SDE",
    //     location: "Blg"
    // },1)
    const code = `x = input()
y = input()
print("value of x is", x)
print("value of y is", y)
`
    
const inputCase = `100
200
`
    
    runPython(code, inputCase)
})