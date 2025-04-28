'use client';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { ChangePasswordSchema } from '@/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormStatus } from 'react-dom';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import { changePassword } from '@/actions/users';
const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });
  async function onSubmit(data: z.infer<typeof ChangePasswordSchema>) {
    setLoading(true);
    const formData = new FormData();
    formData.append('currentPassword', data.currentPassword);
    formData.append('newPassword', data.newPassword);
    try {
      const res = await changePassword(formData);
      if (res.status === 200) {
        toast.success(res.message as string);
      } else {
        toast.error(res.message as string);
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  }
  const { pending } = useFormStatus();
  return (
    <div className='flex flex-col gap-5'>
      <div>
        <h1 className='font-bold'>Change Password</h1>
        <p className='text-slate-600 dark:text-slate-300'>
          User Email: {'eamil@example.com'}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>current Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='********' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='********' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='********' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full cursor-pointer'
              disabled={pending}
            >
              {loading ? 'Loading' : 'Change Password'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
