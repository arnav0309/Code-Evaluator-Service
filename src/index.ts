import express from 'express'
import serverConfig from './config/serverConfig'
const app = express()
app.get('/',() => {
    console.log('Hello World')
})
app.listen(serverConfig.PORT,() => {
    console.log(`server is running on port: ${serverConfig.PORT}`)
})