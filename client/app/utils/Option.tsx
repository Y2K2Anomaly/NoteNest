import React from 'react';
import { styles } from '../styles/style';
import { useDeleteNoteMutation } from '@/redux/features/auth/notesApi';
import toast from 'react-hot-toast';

const Option = ({ noteId, onDeleteNoteHandler, noteOpenHandler, isEdit, onSaveEdit, onEdithandler }: any) => {

    const [deleteNote, { error, isSuccess }] = useDeleteNoteMutation() as any;

    const deleteHandler = async () => {

        try {
            await deleteNote(noteId)
            noteOpenHandler(false)
            onDeleteNoteHandler(noteId)
            toast.success("deleted successfully!")
        } catch (err: any) {
            toast.error(err?.message)
        }
    }

    return (
        <div className='absolute bg-slate-800 rounded-lg text-white w-[100px] top-4 left-[-65px] z-10'>

            {
                !isEdit ? (<div className={styles.option_button} onClick={onEdithandler}>
                    Rename
                </div>) : (
                    <div className={styles.option_button} onClick={onSaveEdit}>
                        Save
                    </div>
                )
            }
            <div className={styles.option_button} onClick={deleteHandler}>
                Delete
            </div>
        </div>
    )
};

export default Option;