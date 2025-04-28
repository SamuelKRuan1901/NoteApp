'use client';
import { CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { usePathname } from 'next/navigation';

interface NoteItemType {
  id: string;
  title: string;
  tags: string[];
  date: string;
}

const NoteItem = ({ id, title, tags, date }: NoteItemType) => {
  const dateFormate = (date: string) => {
    const editingDate = new Date(date);
    return editingDate.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  const formedDate = dateFormate(date);
  const path = usePathname();
  return (
    <div
      className={`w-75 max-md:w-full h-auto px-4 gap-2 rounded-none cursor-pointer
        bg-transparent flex flex-col hover:bg-slate-100 dark:hover:bg-slate-800 py-3 border
        ${
          id === path.split('/')[path.split('/').length - 1]
            ? 'bg-slate-200 dark:bg-slate-700 border-slate-200 dark:border-slate-700'
            : ''
        }`}
    >
      <CardHeader className='pb-0 px-0'>
        <CardTitle className='tracking-wider leading-5'>{title}</CardTitle>
      </CardHeader>
      <div className='w-full flex flex-wrap items-center justify-start gap-1'>
        {tags.map((tag, index) => (
          <div
            key={index}
            className='text-sm text-slate-600 tracking-wider bg-slate-300 p-1 rounded-sm text-center'
          >
            {tag}
          </div>
        ))}
      </div>
      <CardFooter className='px-0'>
        <p className='text-slate-500 text-sm'>{formedDate}</p>
      </CardFooter>
    </div>
  );
};

export default NoteItem;
