import express from "express";
import { addNewNote, deleteNote, getAllNotes, getNote, updateNote } from "../controller/notes.controller";
import { isAuthenticated } from "../middleware/auth";
const notesRouter = express.Router();


notesRouter.post("/add-new-note", isAuthenticated, addNewNote);

notesRouter.put("/update-note/:id", isAuthenticated, updateNote);

notesRouter.get("/note/:id", isAuthenticated, getNote);

notesRouter.get("/notes", isAuthenticated, getAllNotes);

notesRouter.delete("/delete-note/:id", isAuthenticated, deleteNote);


export default notesRouter;