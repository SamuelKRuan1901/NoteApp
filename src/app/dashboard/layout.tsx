'use client';
import { SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { PanelLeft, Search } from 'lucide-react';
import { AppSidebar } from '@/components/dashboard/AppSideBar';
import { Input } from '@/components/ui/input';
import { useContext } from 'react';
import { NoteContext } from '@/contexts/NoteContext';
import { redirect, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NoteMenu from '@/components/dashboard/NoteMenu';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { search, setSearch, setChosenMenuElement, font, isLoading } =
    useContext(NoteContext);
  const session = useSession();
  const path = usePathname();
  const pathName = path.split('/');

  return (
    <section
      className={`w-screen flex 
        ${font === 'sans' && 'font-sans'}
    ${font === 'serif' && 'font-serif'}
    ${font === 'mono' && 'font-mono'} ${isLoading === true && 'relative'}`}
    >
      {session.status === 'unauthenticated' && redirect('/auth/login')}
      {session.status === 'loading' && (
        <div className='w-screen h-screen flex items-center justify-center text-xl font-extrabold'>
          Loading...
        </div>
      )}
      {session.status === 'authenticated' && (
        <>
          <AppSidebar />
          <SidebarInset>
            <header className='flex h-14 py-4 items-center border-b px-4'>
              <SidebarTrigger className='mr-2 hover:bg-slate-400 dark:hover:bg-slate-500 cursor-pointer'>
                <PanelLeft className='h-4 w-4' />
              </SidebarTrigger>
              <div className='w-full flex items-center justify-between px-6'>
                <h1 className='text-lg font-semibold text-slate-600'>
                  Dashboard
                </h1>
                <div className='flex items-center justify-center gap-2 relative'>
                  <Search className='absolute right-2' />
                  <Input
                    placeholder='Searching ...'
                    className='w-52 max-md:w-36 pr-10'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={() => setChosenMenuElement('Search')}
                  />
                </div>
              </div>
            </header>
            <div className='w-full h-full flex'>
              {!pathName.includes('settings') && <NoteMenu />}
              {children}
            </div>
          </SidebarInset>
        </>
      )}
      {isLoading === true && (
        <div className='fixed w-screen h-screen bg-slate-500/40 flex items-center justify-center'>
          <div className='dark:bg-slate-950 bg-slate-50 w-72 h-36 rounded-md flex items-center justify-center text-lg'>
            Loading...
          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardLayout;
