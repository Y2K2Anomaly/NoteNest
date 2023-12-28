import { Request, Response } from "express";
import { IUser } from "../modals/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
        interface Response {
            user?: IUser
        }
    }
}