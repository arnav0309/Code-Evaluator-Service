import {Request,Response} from 'express'

const pingController = (req:Request,res:Response) => {
    return res.status(200).json({
        message: 'pong'
    })
}

export default pingController