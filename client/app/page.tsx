"use client";
import Sidebar from './components/Sidebar';
import Rightbar from './components/Rightbar';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import { useSelector } from 'react-redux';
import { useGetnotesQuery } from '@/redux/features/auth/notesApi';
import { useEffect, useState } from 'react';
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

  const onNoteClick = (id: string) => {
    setNoteId(id);
    setNoteOpen(true);
  }

  const onNewNoteClick = (answer: boolean) => {
    setAddNoteOpen(answer)
  }
  const onAddNewNoteBackHandler = (answer: boolean, note: INote) => {
    setAddNoteOpen(answer)
    setNotes((prev: INote[]) => ([
      ...prev,
      note
    ]))
  };

  const onDeleteNote = (noteId: string) => {
    const updateNotes = notes.filter((note: any) => note._id !== noteId)
    setNotes(updateNotes)
  }

  const { data: notesDataQuery, error, isLoading } = useGetnotesQuery(undefined, {
    skip: !user ? true : false,
  });

  useEffect(() => {
    setNotes(notesDataQuery?.userNotes)
  }, [notesDataQuery])

  let content;

  if (user) {
    content = (
      <div className='flex'>
        <Sidebar allNotes={notes} onNoteClickHandler={onNoteClick} onNewNoteHandler={onNewNoteClick} onDeleteNoteHandler={onDeleteNote} />
        <Rightbar allNotes={notes} noteId={noteId} noteOpen={noteOpen} />
        {
          user && addNoteOpen && <AddNotePage AddNoteBackHandler={onAddNewNoteBackHandler} />
        }
      </div>
    );
  }

  if (!user) {
    content = (
      <div className='flex'>
        <Sidebar allNotes={notes} onNoteClickHandler={onNoteClick} onNewNoteHandler={onNewNoteClick} onDeleteNoteHandler={onDeleteNote} />
        <Rightbar notesDataQuery={notesDataQuery} noteId={noteId} noteOpen={noteOpen} />
        <LoginModal />
        <RegisterModal />
      </div>
    )
  }

  return <>{content}</>;
}