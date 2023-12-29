"use client"
import { useCreateNoteMutation } from "@/redux/features/auth/notesApi";
import { useState } from "react";
import toast from "react-hot-toast";


const AddNote = ({ AddNoteBackHandler, AddNewNoteHandler }: any) => {

    const [note, setNote] = useState({
        title: '',
        description: '',
    })

    const [createNote, { data, error, isSuccess }] = useCreateNoteMutation() as any;

    const handleAddNote = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await createNote(note);
            AddNewNoteHandler(note);
            AddNoteBackHandler(false);
            setNote({
                title: '',
                description: '',
            })
            toast.success("New note created!");
        } catch (error: any) {
            console.log(error)
            toast.error(error?.message)
        }
    }

    return (
        <div
            className="
                    justify-center 
                    items-center 
                    flex 
                    overflow-x-hidden 
                    overflow-y-auto 
                    fixed 
                    inset-0 
                    z-50 
                    outline-none 
                    focus:outline-none
                    bg-neutral-800/70
                "
        >
            <div className="
                    bg-slate-800 
                        relative 
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        xl:w-2/5
                        my-6
                        mx-auto 
                        h-full 
                        lg:h-auto
                        md:h-auto
                        rounded-lg
                    "
            >
                <div className="w-full h-full justify-center z-[10000000000]">
                    <div className="col-start-5 col-span-4 p-5 shadow-sm">
                        <h1 className="text-3xl text-center text-[#bfbfbf]">Add your note here </h1>

                        <form onSubmit={handleAddNote}>
                            {/* title */}
                            <div className="mt-4">
                                <label htmlFor="note_title" className="block text-sm font-medium mb-2 text-[#bfbfbf]">Title</label>
                                <input type="text" className="w-full p-3 rounded-3xl bg-white focus:ring-gray-400-100 border border-gray-800" id="note_title" onChange={(e) => {
                                    setNote((prev) => ({
                                        ...prev,
                                        title: e.target.value
                                    }));
                                }} value={note.title} />
                            </div>
                            {/* CONTENT */}
                            <div className="mt-4">
                                <label htmlFor="note_content" className="block text-sm font-medium mb-2 text-[#bfbfbf]">Description</label>
                                <textarea className="w-full p-3 rounded-3xl bg-white focus:ring-gray-400-100 border border-gray-800 resize-none" id="note_content" rows={5} onChange={(e) => {
                                    setNote((prev) => ({
                                        ...prev,
                                        description: e.target.value
                                    }));
                                }} value={note.description} />
                            </div>

                            {/* Button actions */}
                            <div className="mt-4 flex justify-center">
                                <button className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white" onClick={handleAddNote} disabled={(note.title === "") || (note.description === "")}>Add note</button>
                                <button className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3 text-white" onClick={() => AddNoteBackHandler(false)}>Back</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNote;
