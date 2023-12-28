"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/style';
import { useSelector } from 'react-redux';

const Rightbar = ({ notesDataQuery, noteId, noteOpen }: any) => {
    const [greeting, setGreeting] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const user = useSelector((state: any) => state.auth.user);

    useEffect(() => {
        const currentTime = new Date().getHours();

        let greetingText;
        if (currentTime < 12) {
            greetingText = 'Good Morning';
        } else if (currentTime < 18) {
            greetingText = 'Good Afternoon';
        } else {
            greetingText = 'Good Evening';
        }

        setGreeting(greetingText);

        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        } as const;

        const currentDateText = new Date().toLocaleDateString(undefined, options);

        setCurrentDate(currentDateText);
    }, []);

    return (
        <div className="h-screen w-[75%] bg-slate-100 relative">

            <div className="relative">
                <Image src={"https://source.unsplash.com/random/?notes/"} width={1200} height={500} alt='techonology' style={{ width: "1200px", height: "500px", objectFit: "cover", zIndex: "-100" }} />

                <div className="Greetings absolute top-[10%] left-[2%] text-white">
                    <div className="greeting text-4xl mb-2">{greeting}, {user && user.name + "!"}</div>
                    <div className="date text-sm uppercase">{currentDate}</div>
                </div>
            </div>

            {
                user && (
                    <div className={`${!noteOpen && "hidden"} flex ${styles.note_body}`}>
                        <div className='w-full h-[350px] absolute p-2'>
                            {
                                notesDataQuery?.userNotes?.map((note: any) => (
                                    <span key={note._id} className={`${noteId === note._id ? "block" : "hidden"} text-black text-lg`}>
                                        {note.description}
                                    </span>
                                ))
                            }
                        </div>
                        {!isEdit ?
                            <button className={`bg-red-700 hover:bg-red-600 ${styles.edit_save_button}`} onClick={() => setIsEdit(true)}>
                                Edit
                            </button>
                            :
                            <button className={`bg-blue-700 hover:bg-blue-600 ${styles.edit_save_button}`} onClick={() => setIsEdit(false)}>
                                Save
                            </button>
                        }
                    </div>)}
            {
                !user && (
                    <div className={`flex justify-center items-center ${styles.note_body}`}>
                        <h1 className="text-[48px]">
                            Please Login to Use me!
                        </h1>
                    </div>
                )
            }
            {
                !noteOpen && (
                    <div className={`flex justify-center items-center ${styles.note_body}`}>
                        <h1 className="text-[48px]">
                            Welcome, click to open any note!
                        </h1>
                    </div>
                )
            }
        </div>
    )
}

export default Rightbar;