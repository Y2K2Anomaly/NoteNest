import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../modals/user.model";

// authenticated user
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
        return next(new ErrorHandler("User is not Authenticated", 400))
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

    if (!decoded) {
        return next(new ErrorHandler("access token is not valid", 400));
    }

    const user: any = await userModel.findOne({ _id: decoded.id });

    if (!user) {
        return next(new ErrorHandler("Please login to access the resource", 400));
    }

    req.user = user;

    next();
});
