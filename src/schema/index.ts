import * as z from 'zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 6 characters long' })
  .max(20, { message: 'Password must not be over 20 characters long' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must include least 1 capital letter'
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must include least 1 lower case letter'
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password must include at least 1 numbers'
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'Password must include at least 1 special character'
  });

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: passwordSchema,
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password doesn't match",
    path: ['confirmPassword']
  });

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: passwordSchema
});

export const NoteSchema = z.object({
  title: z.string().min(1, {
    message: 'title at least 1 character'
  }),
  tags: z.array(z.string()).min(1, {
    message: 'title at least 1 character'
  }),
  content: z.string().min(1, {
    message: 'title at least 1 character'
  })
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: 'Current password is required'
    }),
    newPassword: passwordSchema,
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm Password doesn't match",
    path: ['confirmPassword']
  });
