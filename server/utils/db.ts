require('dotenv').config();
import mongoose from "mongoose";

const dbUrl: string = process.env.DATABASE_URL || '';

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl)
            .then((data: any) => {
                console.log(`Database connected. HOST:${data.connection.host} PORT:${data.connection.port} DATABASE_NAME:${data.connection.name}`)
            })
    } catch (error: any) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;