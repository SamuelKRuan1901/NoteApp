'use client';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';
import NoteItem from './NoteItem';
import { usePathname } from 'next/navigation';
import { NoteContext } from '@/contexts/NoteContext';

const NoteMenu = () => {
  const { chosenMenuElement, data } = useContext(NoteContext);
  const path = usePathname();
  const pathName = path.split('/')[path.split('/').length - 1];

  const sortedNotes = [...data].sort(
    (a, b) =>
      new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime()
  );

  return (
    <div
      className={`w-80 h-screen max-md:w-full max-md:absolute 
        top-14 left-0 ${
          window.innerWidth < 768 && pathName !== 'dashboard' ? 'hidden' : ''
        }
        dark:max-md:bg-slate-950 max-md:bg-slate-50 max-md:w-full max-lg:w-1/2
        border-r flex flex-col items-center`}
    >
      {chosenMenuElement !== 'Settings' && (
        <Button
          className='w-72 my-2 cursor-pointer'
          // onClick={handleOpenCreateNote}
          asChild
        >
          <Link href={`/dashboard/createNote`}>
            Create A Note <Plus size={20} />
          </Link>
        </Button>
      )}

      <div className='w-full overflow-auto h-screen'>
        {chosenMenuElement !== 'Settings' && (
          <>
            {sortedNotes?.map((item) => (
              <Link href={`/dashboard/${item._id}`} key={item._id as string}>
                <NoteItem
                  id={item._id as string}
                  title={item.title}
                  tags={item.tags}
                  date={item.lastEdited}
                />
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NoteMenu;
