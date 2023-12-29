import AddNote from "./AddNote";

export const metadata = {
    title: "Add Note: NoteNest"
};

const AddNotePage = ({ AddNoteBackHandler, AddNewNoteHandler }: any) => {
    return <AddNote AddNoteBackHandler={AddNoteBackHandler} AddNewNoteHandler={AddNewNoteHandler} />
};

export default AddNotePage;