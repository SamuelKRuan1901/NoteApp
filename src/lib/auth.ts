import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '@/db/models';
import bcryptjs from 'bcryptjs';
import { connectDB } from '@/db/ConnectDB';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: {
          // Changed key from 'username' to 'email'
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const email = credentials?.email; // Now matches the credentials config
        const password = credentials?.password;

        try {
          await connectDB();
        } catch (error) {
          console.error('DB connection error:', error);
          return null;
        }

        const user = await User.findOne({ email });
        if (!user) {
          console.log('User does not exist');
          return null;
        }

        const passwordOk = bcryptjs.compareSync(
          password as string,
          user.password
        );
        if (!passwordOk) {
          console.log('Passwords do not match');
          return false;
        }
        return user;
      }
    })
  ]
};
