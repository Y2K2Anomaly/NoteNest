import AddNote from "./AddNote";

export const metadata = {
    title: "Add Note: NoteNest"
};

const AddNotePage = ({ AddNoteBackHandler }: any) => {
    return <AddNote AddNoteBackHandler={AddNoteBackHandler} />
};

export default AddNotePage;