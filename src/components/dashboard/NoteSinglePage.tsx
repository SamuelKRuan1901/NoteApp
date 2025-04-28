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
import { useState } from 'react';

const NoteSinglePage = ({
  title = '',
  tags = '',
  content = '',
  lastEdited = 'Not Edited Yet',
  archived = true
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    mode: 'onChange',
    defaultValues: {
      title: title,
      tags: tags,
      content: content
    }
  });

  const onSubmit = (data: z.infer<typeof NoteSchema>) => {
    setLoading(true);
    console.log(data, archived, lastEdited);
    setLoading(false);
  };
  const handleCancelEditNote = () => {
    window.location.reload();
  };
  const { pending } = useFormStatus();
  return (
    <div className='w-full h-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4 p-3'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <BookA size={20} />
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter your title'
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
                <FormItem>
                  <FormLabel>
                    <Tag size={20} />
                    <p>Tags</p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter your tags eg: Dev, Tag'
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
                  Archived
                </span>
                <span className='text-slate-600'>{`${archived}`}</span>
              </div>
            )}
            <div className='flex gap-3 my-2'>
              <span className='font-semibold flex items-center gap-2'>
                <Clock size={20} />
                Last edited
              </span>
              <span className='text-slate-600'>{lastEdited}</span>
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
                      className='h-36 my-3'
                      placeholder='Enter your tags eg: Dev, Tag'
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
                {loading ? 'Loading' : 'Save Note'}
              </Button>
              <Button
                variant={'outline'}
                className='cursor-pointer'
                disabled={pending}
                onClick={handleCancelEditNote}
              >
                {loading ? 'Loading' : 'Cancel'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NoteSinglePage;
