// import { auth } from '@/auth';
import LoginForm from '@/components/auth/LoginForm';
// import { redirect } from 'next/navigation';

const LoginPage = async () => {
  // const session = await auth();
  // if (session) {
  //   redirect('/dashboard');
  // }
  // console.log(session);
  return <LoginForm />;
};

export default LoginPage;
