'use server';

import { connectDB } from '@/db/ConnectDB';
import { User } from '@/db/models';
import bcryptjs from 'bcryptjs';
import { getServerSession } from 'next-auth';

export const register = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
    await connectDB();
    const user = await User.findOne({ email });
    if (user) {
      return { status: 402, message: 'User already exists' };
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = { email: email, password: hashedPassword };
    await User.create(newUser);
    return { status: 200, message: 'User created successfully' };
  } catch (error) {
    return { status: 500, message: error };
  }
};

export async function getFonts() {
  try {
    await connectDB();
    const session = await getServerSession();
    const user = await User.find({ email: session?.user?.email }).lean();
    if (!user) {
      return [];
    }
    if (user[0].password) {
      const passwordExists = true as boolean;
      const fontTheme = user[0].fontTheme as string;
      return { fontTheme: fontTheme, passwordExists: passwordExists };
    }
    const passwordExists = false as boolean;
    const fontTheme = user[0].fontTheme as string;
    return { fontTheme: fontTheme, passwordExists: passwordExists };
  } catch (error) {
    console.log(error);
  }
}

export async function updateFont(font: string) {
  try {
    await connectDB();
    const session = await getServerSession();
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      await User.create({ email: session?.user?.email, fontTheme: font });
    }
    await User.updateOne({ email: session?.user?.email }, { fontTheme: font });
    return { status: 200, message: 'Font updated successfully' };
  } catch (error) {
    return { status: 500, message: error };
  }
}

export async function changePassword(formData: FormData) {
  // console.log(formData);
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  try {
    await connectDB();
    const session = await getServerSession();
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return { status: 402, message: 'User not found' };
    }
    const isPasswordMatch = await bcryptjs.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatch) {
      return { status: 402, message: 'Current password is incorrect' }; // throw new Error('Current password is incorrect');
    }
    const hashedPassword = await bcryptjs.hash(newPassword, 12);
    await User.updateOne(
      { email: session?.user?.email },
      { password: hashedPassword }
    );
    return { status: 200, message: 'Password changed successfully' };
  } catch (error) {
    return { status: 500, message: error };
  }
}
