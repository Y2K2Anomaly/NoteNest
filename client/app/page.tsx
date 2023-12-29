"use client";
import Sidebar from './components/Sidebar';
import Rightbar from './components/Rightbar';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import { useSelector } from 'react-redux';
import { useGetnotesQuery } from '@/redux/features/auth/notesApi';
import { useCallback, useEffect, useState } from 'react';
import AddNotePage from './components/add-task/AddNotePage';

interface INote {
  title: string;
  description: string;
}

export default function Home() {
  const user = useSelector((state: any) => state.auth.user);

  const [noteId, setNoteId] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [notes, setNotes] = useState<INote[]>([]);

  const { data: notesDataQuery, error, isLoading, refetch } = useGetnotesQuery(undefined, {
    skip: !user ? true : false,
  });

  useEffect(() => {
    setNotes(notesDataQuery?.userNotes)
  }, [notesDataQuery])

  const onNoteClick = (id: string) => {
    setNoteId(id);
    setNoteOpen(true);
  }

  const onNewNoteClick = (answer: boolean) => {
    setAddNoteOpen(answer)
  }
  const onAddNoteBackHandler = (answer: boolean) => {
    setAddNoteOpen(answer)
  };

  const onAddNewNote = useCallback((note: INote) => {
    setNotes((prev: INote[]) => ([
      ...prev,
      note
    ]))
    refetch();
  }, [refetch])

  const onDeleteNote = (noteId: string) => {
    const updateNotes = notes.filter((note: any) => note._id !== noteId)
    setNotes(updateNotes)
  }

  const onNoteOpen = (answer: boolean) => {
    setNoteOpen(answer)
  }

  let content;

  if (user) {
    content = (
      <div className='flex'>
        <Sidebar allNotes={notes} onNoteClickHandler={onNoteClick} onNewNoteHandler={onNewNoteClick} onDeleteNoteHandler={onDeleteNote} noteOpen={noteOpen} noteOpenHandler={onNoteOpen} />
        <Rightbar allNotes={notes} noteId={noteId} noteOpen={noteOpen} />
        {
          user && addNoteOpen && <AddNotePage AddNewNoteHandler={onAddNewNote} AddNoteBackHandler={onAddNoteBackHandler} />
        }
      </div>
    );
  }

  if (!user) {
    content = (
      <div className='flex'>
        <Sidebar allNotes={notes} onNoteClickHandler={onNoteClick} onNewNoteHandler={onNewNoteClick} onDeleteNoteHandler={onDeleteNote} noteOpenHandler={onNoteOpen} />
        <Rightbar notesDataQuery={notesDataQuery} noteId={noteId} noteOpen={noteOpen} />
        <LoginModal />
        <RegisterModal />
      </div>
    )
  }

  return <>{content}</>;
}