require('dotenv').config();
import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../modals/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import path from "path";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";


interface IRegisterationBody {
    name: string;
    email: string;
    password: string;
}

// create a new user
export const registerUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { name, email, password } = req.body;

        const user: IRegisterationBody = {
            name,
            email,
            password
        };

        const existUser = await userModel.findOne({ email });

        if (existUser) {
            return next(new ErrorHandler("Email already exist", 400));
        }

        const newUser = await userModel.create(user);

        res.status(201).json({
            success: true,
            message: "new user created"
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});


// Login User
interface ILoginRequest {
    email: string;
    password: string;
}

export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as ILoginRequest;

        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 400))
        };

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 400))
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid email or password", 400));
        };

        sendToken(user, 200, res);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// get a user 
export const getUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.findById(req.user?.id);
        if (!user) {
            return next(new ErrorHandler("User doesn't exist", 404));
        }

        return res.status(200).json({
            success: true,
            user,
        })
    } catch (error: any) {
        return next(new ErrorHandler("Internal server error", 500))
    }
})

// logout user
export const logoutUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        const userId = req.user?._id || "";

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// update access token
export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refresh_token as string;
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;

        const message = 'Please login to access this resources';

        if (!decoded) {
            return next(new ErrorHandler(message, 400));
        }

        const user = await userModel.findOne({ _id: decoded.id as string });

        if (!user) {
            return next(new ErrorHandler("user is not allowed", 400))
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET as string, {
            expiresIn: "5m",
        });

        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET as string, {
            expiresIn: "3d"
        });

        req.user = user;

        res.cookie("access_token", accessToken, accessTokenOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenOptions);

        res.status(200).json({
            status: "success",
            accessToken,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// delete user --- only for admin
export const deleteUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const user = await userModel.findById(id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        await user.deleteOne({ id });

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});