'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/schema';
import CardWrapper from './CardWrapper';
import { useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    const { email, password } = data;
    await signIn('credentials', { email, password });
    toast.success('Login successful');
    setLoading(false);
    redirect('/dashboard');
  };
  const handleLoginByGoogle = async () => {
    try {
      await signIn('google');
      toast.success('Login successful');
    } catch (error) {
      toast.error('something went wrong');
      throw error;
    }
    redirect('/dashboard');
  };

  useEffect(() => {
    if (status === 'authenticated') redirect('/dashboard');
  }, [status]);

  const { pending } = useFormStatus();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <CardWrapper
      label={'Login with your account'}
      title={'Sign In'}
      backButtonHref={'/auth/register'}
      backButtonLabel={"Don't have an account? Register Now"}
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
                      placeholder='exam@example.com'
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
                    <Input {...field} type='password' placeholder='*******' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full cursor-pointer mt-3'
              disabled={pending}
            >
              {loading ? 'Loading' : 'Sign In'}
            </Button>
          </div>
        </form>
      </Form>
      <div className='w-full flex flex-col gap-5 mt-4'>
        <div>
          <span className='w-full text-slate-600 dark:text-slate-300 flex items-center justify-center'>
            Or
          </span>
        </div>
        <form action={handleLoginByGoogle}>
          <Button type='submit' className='w-full cursor-pointer'>
            <FaGoogle />
            <span>Sign in with Google</span>
          </Button>
        </form>
      </div>
    </CardWrapper>
  );
};

export default LoginForm;
