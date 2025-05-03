'use client';
import React, { createContext, useEffect, useState } from 'react';
import { ArchiveNote, DeleteNote, getNotes } from '@/actions/notes';
import { Note } from '@/lib/types';
import { redirect, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { getFonts } from '@/actions/users';
// Define an interface for the context value
interface NoteContextType {
  data: Note[];
  setData: React.Dispatch<React.SetStateAction<Note[]>>;
  noteId: string | null;
  setNoteId: React.Dispatch<React.SetStateAction<string | null>>;
  chosen: string;
  setChosen: React.Dispatch<React.SetStateAction<string>>;
  chosenMenuElement: string;
  setChosenMenuElement: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  font: string;
  setFont: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleArchive: () => Promise<void>;
  handleDelete: () => Promise<void>;
  fetchData: (
    chosen: string,
    chosenMenuElement: string,
    search: string
  ) => void;
  fetchFont: () => void;
  passwordExited: boolean;
  setPasswordExited: React.Dispatch<React.SetStateAction<boolean>>;
}

// Provide a default value using a type assertion. You can also use null and manage it accordingly.
export const NoteContext = createContext<NoteContextType>(
  {} as NoteContextType
);

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  // Type your states explicitly to avoid unwanted type inference:
  const [data, setData] = useState<Note[]>([]);
  const [noteId, setNoteId] = useState<string | null>(null);
  // If chosen is meant to be a tag or note identifier, initialize as an empty string:
  const [chosen, setChosen] = useState<string>('');
  const [chosenMenuElement, setChosenMenuElement] = useState<string>('Home');
  const [search, setSearch] = useState<string>('');
  const [font, setFont] = useState<string>('sans');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordExited, setPasswordExited] = useState<boolean>(false);

  const fetchFont = async () => {
    try {
      const res = await getFonts();
      if (!Array.isArray(res)) {
        const fontTheme = res?.fontTheme as string;
        const passwordExists = res?.passwordExists as boolean;
        setFont(fontTheme);
        setPasswordExited(passwordExists);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Define the handleArchive and handleDelete functions
  const handleArchive = async () => {
    setIsLoading(true);
    try {
      if (noteId) {
        await ArchiveNote(noteId);
        toast.info('Archived successfully');
      }
    } catch (error) {
      // Casting error to Error so we can access its message:
      toast.error((error as Error).message);
    }
    setIsLoading(false);
    redirect(pathName);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      if (noteId) {
        await DeleteNote(noteId);
        toast.info('Deleted successfully');
        await fetchData(chosen, chosenMenuElement, search);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
    setIsLoading(false);
    const pathArray = pathName.split('/');
    const newPath = pathArray.slice(0, pathArray.length - 1).join('/');
    redirect(newPath);
  };

  const fetchData = async (
    chosen: string,
    chosenMenuElement: string,
    search: string
  ) => {
    try {
      const result = await getNotes();
      if (chosenMenuElement === 'Tags') {
        const uniqueTags = [
          ...new Set(result?.flatMap((note: Note) => note.tags) ?? [])
        ];
        if (uniqueTags.includes(chosen)) {
          setData(result.filter((item: Note) => item.tags.includes(chosen)));
          return;
        }
      }
      if (chosenMenuElement === 'Archived') {
        setData(result.filter((note: Note) => note.isArchived === true));
        return;
      }
      if (chosenMenuElement === 'Settings') {
        return;
      }
      if (chosenMenuElement === 'Search') {
        const notesQueryBySearch = result.filter((item: Note) => {
          if (!search) return true;
          const lowerSearchValue = search.toLowerCase();
          return (
            item.title.toLowerCase().includes(lowerSearchValue) ||
            item.tags.toString().toLowerCase().includes(lowerSearchValue) ||
            item.content.toLowerCase().includes(lowerSearchValue)
          );
        });
        setData(notesQueryBySearch);
        return;
      }
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // No need for casting now—'chosen' is already a string.
    fetchFont();
    fetchData(chosen, chosenMenuElement, search);
  }, [chosen, chosenMenuElement, search]);

  const values: NoteContextType = {
    data,
    setData,
    noteId,
    setNoteId,
    chosen,
    setChosen,
    chosenMenuElement,
    setChosenMenuElement,
    search,
    setSearch,
    font,
    setFont,
    isLoading,
    setIsLoading,
    handleArchive,
    handleDelete,
    fetchData,
    fetchFont,
    passwordExited,
    setPasswordExited
  };

  return <NoteContext.Provider value={values}>{children}</NoteContext.Provider>;
};
