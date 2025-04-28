'use client';
import { settingsItems } from '@/lib/menuItems';
import { Button } from '../ui/button';
import { IoIosLogOut } from 'react-icons/io';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SettingsMenu = () => {
  const path = usePathname();
  const pathName = path.split('/')[path.split('/').length - 1];
  return (
    <div
      className={`w-80 h-screen max-md:w-full max-md:absolute 
      top-14 left-0 ${
        window.innerWidth < 768 && pathName !== 'settings' ? 'hidden' : ''
      }
      dark:max-md:bg-slate-950 max-md:bg-slate-50 max-md:w-full max-lg:w-1/2 border-r flex flex-col items-start gap-5 p-4 max-md:p-8`}
    >
      <h1 className='font-semibold'>Settings</h1>
      {settingsItems.map((item) => (
        <Button
          key={item.id}
          variant={'outline'}
          size={'lg'}
          className='cursor-pointer flex items-center justify-start px-3 py-2 w-full'
          asChild
        >
          <Link href={`/dashboard/settings/${item.href}`}>
            <item.icon />
            {item.title}
          </Link>
        </Button>
      ))}
      <hr className='w-full' />
      <form action={() => signOut({ callbackUrl: '/auth/login' })}>
        <Button type='submit' className='cursor-pointer' size={'lg'}>
          <IoIosLogOut />
          Logout
        </Button>
      </form>
    </div>
  );
};

export default SettingsMenu;
