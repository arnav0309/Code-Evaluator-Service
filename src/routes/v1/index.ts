import express from 'express'
import pingController from '../../controllers/pingController'
import submissionRouter from './submissionRoute'

const v1Router = express.Router()

v1Router.use('/submissions', submissionRouter)

v1Router.get('/ping',pingController)

export default v1Router