"use client";
import Sidebar from './components/Sidebar';
import Rightbar from './components/Rightbar';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import { useSelector } from 'react-redux';
import { useGetnotesQuery } from '@/redux/features/auth/notesApi';
import { useState } from 'react';

export default function Home() {
  const user = useSelector((state: any) => state.auth.user);

  const [noteId, setNoteId] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);

  const onNoteClick = (id: string) => {
    setNoteId(id);
    setNoteOpen(true);
  }

  const { data: notesDataQuery, error, isLoading } = useGetnotesQuery(undefined, {
    skip: !user ? true : false,
  });
  let content;

  if (user) {
    content = (
      <div className='flex'>
        <Sidebar notesDataQuery={notesDataQuery} onNoteClickHandler={onNoteClick} />
        <Rightbar notesDataQuery={notesDataQuery} noteId={noteId} noteOpen={noteOpen} />
      </div>
    );
  }

  if (!user) {
    content = (
      <div className='flex'>
        <Sidebar notesDataQuery={notesDataQuery} />
        <Rightbar notesDataQuery={notesDataQuery} />
        <LoginModal />
        <RegisterModal />
      </div>
    )
  }

  return <>{content}</>;
}