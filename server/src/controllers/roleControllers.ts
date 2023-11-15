import { NextFunction, Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import AuthServices from "../services/authServices"
import axios from "axios"
import RoleServices from "../services/rolesServices"

namespace RoleControllers {
    export const getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body
            const response = await RoleServices.getOne(data)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }
}

export default RoleControllers
