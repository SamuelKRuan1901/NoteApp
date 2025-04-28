'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Tag, BookA, Clock, Archive, TableOfContents } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NoteSchema } from '@/schema';
import { useFormStatus } from 'react-dom';
import { useContext } from 'react';
import ArchiveAndDeleteButton from '@/components/dashboard/ArchiveAndDeleteButton';
import { NoteContext } from '@/contexts/NoteContext';
import { CreateNote, SaveNote } from '@/actions/notes';
import { redirect, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import TagInput from './TagInput';

const NoteForm = ({
  title = '',
  tags = [],
  content = '',
  lastEdited = '',
  archived = false,
  id = ''
}) => {
  const {
    handleArchive,
    handleDelete,
    isLoading,
    setIsLoading,
    fetchData,
    chosen,
    chosenMenuElement,
    search
  } = useContext(NoteContext);
  const pathName = usePathname();
  const dateFormate = (date: string) => {
    const editingDate = new Date(date);
    return editingDate.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  const formedDate = dateFormate(lastEdited);
  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    mode: 'onChange',
    defaultValues: {
      title: title,
      tags: tags,
      content: content
    }
  });

  const onSubmit = async (data: z.infer<typeof NoteSchema>) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('tags', data.tags.toString());
    formData.append('content', data.content);
    setIsLoading(true);
    let newNoteId = '';
    if (id === 'createNote') {
      try {
        const newestNote = await CreateNote(formData);
        if (!newestNote) {
          toast.error('failed to create note');
          return;
        }
        toast.success('created successfully');
        await fetchData(chosen, chosenMenuElement, search);
        newNoteId = newestNote._id;
      } catch (error) {
        toast.error(error as string);
      }
      setIsLoading(false);
      redirect(`/dashboard/${newNoteId}`);
    }
    try {
      formData.append('id', id);
      await SaveNote(formData);
      toast.success('updated successfully');
      await fetchData(chosen, chosenMenuElement, search);
    } catch (error) {
      toast.error(error as string);
    }
    setIsLoading(false);
    redirect(pathName);
  };
  const handleCancelEditNote = () => {
    window.location.reload();
  };
  const { pending } = useFormStatus();
  return (
    <>
      {' '}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4 p-3'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='flex'>
                  <FormLabel>
                    <BookA size={20} />
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter your title...'
                      className='text-xl font-bold'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem className='flex'>
                  <FormLabel>
                    <Tag size={20} />
                    <p>Tags</p>
                  </FormLabel>
                  <FormControl>
                    <TagInput
                      onChange={field.onChange}
                      tagValue={field.value ? field.value : []}
                      placeholder='Enter your tags...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {archived === true && (
              <div className='flex gap-3 my-2'>
                <span className='font-semibold flex items-center gap-2'>
                  <Archive size={20} />
                  Status
                </span>
                <span className='text-slate-600'>Archived</span>
              </div>
            )}
            <div className='flex gap-3 my-2'>
              <span className='font-semibold flex items-center gap-2'>
                <Clock size={20} />
                Last edited
              </span>
              <span className='text-slate-600'>
                {!lastEdited ? '' : `${formedDate}`}
              </span>
            </div>
            <hr className='my-3' />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <TableOfContents size={20} />
                    <p>Content</p>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={pending}
                      className='h-75 my-3 resize-none overflow-auto'
                      placeholder='Enter your note here...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex gap-2'>
              <Button
                type='submit'
                className='cursor-pointer'
                disabled={pending}
              >
                Save Note
              </Button>
              <Button
                variant={'outline'}
                className='cursor-pointer'
                disabled={pending}
                onClick={handleCancelEditNote}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {id !== 'createNote' && (
        <div className={`max-md:hidden w-full flex items-center justify-start`}>
          <ArchiveAndDeleteButton
            handleArchiveNote={handleArchive}
            loading={isLoading}
            handleDeleteNote={handleDelete}
          />
        </div>
      )}
    </>
  );
};

export default NoteForm;
