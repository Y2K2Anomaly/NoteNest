"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import Option from '../utils/Option';
import { styles } from '../styles/style';
import Mousehover from '../utils/Mousehover';
import { useLogOutQuery } from '@/redux/features/auth/authApi';
import { useSelector } from 'react-redux';
import useLoginModal from '../hooks/useLoginModal';

import { useRouter } from 'next/navigation';

const Sidebar = ({ allNotes, onNoteClickHandler, onNewNoteHandler, onDeleteNoteHandler }: any) => {

    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const [isOption, setIsOption] = useState(false);

    const router = useRouter();

    const [clickedNoteId, setClickedNoteId] = useState<string | null>(null);

    const handleNoteClick = useCallback((noteId: string) => {
        onNoteClickHandler(noteId);
    }, [onNoteClickHandler]);

    const handleOptionClick = useCallback((noteId: string) => {
        setClickedNoteId(noteId);
        setIsOption(prev => !prev);
    }, []);

    const user = useSelector((state: any) => state.auth.user);

    const [logout, setLogout] = useState(false);

    const loginModal = useLoginModal();

    const { } = useLogOutQuery(undefined, {
        skip: !logout ? true : false,
    });

    const logoutHandler = () => {
        if (user) {
            setLogout(true)
            router.refresh();
        } else {
            loginModal.onOpen();
        }
    };

    const newNoteHandler = () => {
        if (!user) {
            loginModal.onOpen();
        }
        onNewNoteHandler(true)
    };

    return (
        <div className='flex flex-col bg-gray-700 h-screen w-[25%]'>
            <div className="bg-slate-600 w-full px-4 py-2">
                <h1 className='text-center text-3xl font-bold text-[#cfcfcf]'>NoteNest</h1>
            </div>
            <div className="flex items-center justify-end w-full space-x-2 rounded-md px-4 py-2">
                <h1 className='text-[#ef0000] text-xl'>{user?.name || "no_user"}</h1>
                <div
                    className={`${styles.hover_circle} relative`}
                    onMouseEnter={() => setIsLogoutHovered(true)}
                    onMouseLeave={() => setIsLogoutHovered(false)}
                    onClick={logoutHandler}
                >
                    <FaPowerOff size={20} color={"gray"} />
                    {
                        isLogoutHovered && user && <Mousehover title='Logout' />
                    }
                    {
                        isLogoutHovered && !user && <Mousehover title='Login' />
                    }
                </div>
            </div>

            <div className='Search_Filter w-[90%] mx-auto space-y-2'>
                <div className="h-[80px] flex flex-col justify-between">
                    <FaSearch className="absolute z-10 ml-2 mt-2" color={"white"} />
                    <input type="text" className='rounded-xl text-white w-full px-8 h-8 relative bg-slate-900' placeholder='Search' />

                    <select name="" id="" className="rounded-xl w-full h-8 bg-green-600 text-white px-2 outline-none">
                        <option value="Filter by Month" disabled selected>Filter by Month</option>
                        <option value="">All</option>
                        <option value="">January</option>
                        <option value="">Febuary</option>
                        <option value="">March</option>
                        <option value="">April</option>
                        <option value="">May</option>
                        <option value="">June</option>
                        <option value="">July</option>
                        <option value="">August</option>
                        <option value="">September</option>
                        <option value="">October</option>
                        <option value="">November</option>
                        <option value="">December</option>
                    </select>
                </div>
            </div>
            <span className='block w-full h-[2px] bg-gray-400 mt-4 mb-2'></span>
            <div className='ADD_NEW_&_ALL_ALLNOTES w-[90%] mx-auto'>
                <h1 className="text-gray-400">Add new Note</h1>
                <div className="flex justify-center w-80 px-2 py-4 bg-slate-800 hover:bg-slate-900 rounded-xl group active:scale-95 mx-auto" onClick={() => newNoteHandler()}>
                    <IoMdAdd color={"white"} className="transform group-hover:scale-125" />
                </div>

                <div className="mt-2">
                    <h1 className="text-gray-400">All Allnotes: {allNotes?.length === 0 ? " 0" : allNotes?.length} </h1>
                    <div>
                        {allNotes?.map((note: any) => (
                            <div
                                key={note._id}
                                className={`flex justify-between items-center bg-slate-800 hover:bg-slate-900 w-full h-12 rounded-sm text-white mb-2 px-2`}
                                onClick={() => handleNoteClick(note._id)}
                            >
                                <p>{note.title}</p>
                                <div
                                    className="relative active:scale-95"
                                    onClick={() => handleOptionClick(note._id)}
                                >
                                    <SlOptionsVertical className="-z-100" />
                                    {isOption && (clickedNoteId === note._id) && <Option noteId={note._id} onDeleteNoteHandler={onDeleteNoteHandler} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Sidebar;