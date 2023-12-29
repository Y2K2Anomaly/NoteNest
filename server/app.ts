require('dotenv').config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import { ErrorMiddleware } from "./middleware/error";
import notesRouter from "./routes/notes.route";
import helmet from "helmet";

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());
app.use(helmet());

// cors => cross origin resource sharing
app.use(
    cors({
        origin: process.env.CLIENT,
        credentials: true,
    })
);

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// middlewares to enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT as string);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// routes
app.use("/api/v1", userRouter);
app.use("/api/v1", notesRouter);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {

    res.status(200).json({
        success: true,
        message: "API is working"
    })
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found!`) as any;
    err.statusCode = 404;
    next(err);
});

app.use(ErrorMiddleware);