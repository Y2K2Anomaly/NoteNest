import { timeStamp } from "console";
import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "./user.model";


interface INotes {
    title: string;
    description: string;
    userId: Schema.Types.ObjectId;
}

const notesSchema: Schema<INotes> = new mongoose.Schema({
    title: String,
    description: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });


const notesModel: Model<INotes> = mongoose.model("Notes", notesSchema);

export default notesModel;