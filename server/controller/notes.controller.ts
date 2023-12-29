import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import notesModel from "../modals/note.model";
import ErrorHandler from "../utils/ErrorHandler";

// get a note 
export const getNote = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const note = await notesModel.findById(id);
        if (!note) {
            return next(new ErrorHandler("Note doesn't exist", 404));
        }

        return res.status(200).json({
            success: true,
            note
        })
    } catch (error: any) {
        return next(new ErrorHandler("Internal server error", 500))
    }
})

// Add a new note
export const addNewNote = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            if (!title) {
                return next(new ErrorHandler("Please enter the title", 400));
            }
            if (!description) {
                return next(new ErrorHandler("Please enter the description", 400));
            }
        }

        const noteExist = await notesModel.findOne({ title });
        if (noteExist) {
            return next(new ErrorHandler("Title already exist", 400));
        }

        const newNote = new notesModel({
            title,
            description,
            userId: req.user?._id
        });
        await newNote.save();

        return res.status(201).json({
            success: true,
            message: "Note created successfully!"
        })
    } catch (error: any) {
        return next(new ErrorHandler("Internal server error", 500))
    }
});

// get all notes of user
export const getAllNotes = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allNotes = await notesModel.find({});
        if (allNotes.length === 0) {
            return next(new ErrorHandler("Notes doesn't exist", 404));
        }

        const userNotes = allNotes.filter(note => note.userId.toString() === req.user?._id.toString());

        return res.status(200).json({
            success: true,
            userNotes,
        })
    } catch (error: any) {
        return next(new ErrorHandler("Internal server error", 500));
    }
});

// update a note
export const updateNote = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const note = await notesModel.findById(id);
        if (!note) {
            return next(new ErrorHandler("Note not found", 404));
        }

        if (title) {
            note.title = title;
        }
        if (description) {
            note.description = description;
        }

        await note.save();

        return res.status(200).json(
            {
                success: true,
                note,
            }
        );
    } catch (error: any) {
        return next(new ErrorHandler("Internal server error", 500));
    }
});

// delete a note
export const deleteNote = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const note = await notesModel.findById(id);

        if (!note) {
            return next(new ErrorHandler("Note not found", 404));
        }

        await note.deleteOne({ id });

        return res.status(200).json({
            success: true,
            message: "Note deleted Successfully!"
        })
    } catch (error: any) {
        return next(new ErrorHandler("Internal server error", 500));
    }
});