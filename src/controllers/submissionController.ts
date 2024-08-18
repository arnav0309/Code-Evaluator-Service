import {Request,Response} from 'express'
import { createSubmisssionDto } from "../dtos/createSubmissionDto"

export function addSubmission (req:Request,res:Response)  {
    const submissionDto = req.body as createSubmisssionDto


    return res.status(200).json({
        success: true,
        error: {},
        message: 'successfully collected the submission',
        data: submissionDto
    })
}