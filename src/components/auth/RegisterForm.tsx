'use client';

import CardWrapper from './CardWrapper';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { RegisterSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { z } from 'zod';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { register } from '@/actions/users';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);
    const res = await register(formData);
    if (res.status === 200) {
      toast.success(res.message as string);
      redirect('/auth/login');
    } else {
      toast.error(res.message as string);
    }
    setLoading(false);
  };
  const { pending } = useFormStatus();
  return (
    <CardWrapper
      label={'Create an Account'}
      title={'Register'}
      backButtonHref={'/auth/login'}
      backButtonLabel={'Already have an account? Login Here'}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      name='email'
                      placeholder='email@example.com'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      name='password'
                      placeholder='*******'
                    />
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
                    <Input
                      {...field}
                      type='password'
                      name='confirmPassword'
                      placeholder='*******'
                    />
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
              {loading ? 'Loading...' : 'Register'}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
