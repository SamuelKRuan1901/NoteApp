'use server';
import { connectDB } from '@/db/ConnectDB';
import { Note } from '@/db/models';
import { getServerSession } from 'next-auth';
export const getNotes = async () => {
  await connectDB();
  try {
    const session = await getServerSession();
    const notes = await Note.find({ userEmail: session?.user?.email }).lean();
    if (!notes) {
      return [];
    }
    const data = JSON.parse(JSON.stringify(notes));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getNote = async (id: string) => {
  if (id === 'create-note' || !id) return null;
  await connectDB();
  const session = await getServerSession();
  try {
    const note = await Note.findOne({
      userEmail: session?.user?.email,
      _id: id
    }).lean();
    if (!note) {
      return null;
    }
    return note;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function deleteNote(id: string) {
  await connectDB();
  try {
    await Note.deleteOne({ _id: id });
    return true;
  } catch (error) {
    throw error;
  }
}

export async function ArchiveNote(id: string) {
  await connectDB();
  try {
    await Note.updateOne({ _id: id }, { isArchived: true });
    return true;
  } catch (error) {
    throw error;
  }
}

export async function DeleteNote(id: string) {
  await connectDB();
  try {
    await Note.deleteOne({ _id: id });
    return true;
  } catch (error) {
    throw error;
  }
}

export async function SaveNote(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const tags = formData.get('tags') as string;
  const content = formData.get('content') as string;
  const capitalizedTags = tags
    .split(',')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  await connectDB();
  try {
    await Note.findByIdAndUpdate(
      { _id: id },
      {
        title: title,
        tags: capitalizedTags,
        content: content,
        lastEdited: new Date().toISOString()
      }
    );
  } catch (error) {
    throw error;
  }
}

export async function CreateNote(formData: FormData) {
  const session = await getServerSession();
  const title = formData.get('title') as string;
  const tags = formData.get('tags') as string;
  const content = formData.get('content') as string;
  const capitalizedTags = tags
    .split(',')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  await connectDB();
  try {
    const newNote = new Note({
      userEmail: session?.user?.email,
      title: title,
      tags: capitalizedTags,
      content: content,
      isArchive: false,
      lastEdited: new Date().toISOString()
    });
    await newNote.save();
    try {
      const notes = await getNotes();
      const newestNote = notes[notes.length - 1];
      return newestNote;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}
