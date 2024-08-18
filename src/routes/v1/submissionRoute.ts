import express from 'express'
import { addSubmission } from '../../controllers/submissionController'
import { validate } from '../../validator/zodValidator'
import { createSubmisssionZodSchema } from '../../dtos/createSubmissionDto'

const submissionRouter = express.Router()

submissionRouter.post('/',
    validate(createSubmisssionZodSchema),
    addSubmission)

export default submissionRouter