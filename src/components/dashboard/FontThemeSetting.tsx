'use client';
import { updateFont } from '@/actions/users';
// import { getFonts } from '@/actions/users';
import { Label } from '@/components/ui/label';
import { NoteContext } from '@/contexts/NoteContext';
import { fontTheme } from '@/lib/menuItems';
import { useContext } from 'react';
import { toast } from 'react-toastify';
// import { useEffect } from 'react';

const FontThemeSetting = () => {
  const { font, setFont, fetchFont } = useContext(NoteContext);

  const handleChoseFont = async (value: string) => {
    setFont(value);
    try {
      const res = await updateFont(value);
      if (res.status === 200) toast.success(res.message as string);
      else toast.error(res.message as string);
      await fetchFont();
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <div className='flex flex-col gap-5'>
      <div>
        <h1 className='font-bold'>Font Theme</h1>
        <p className='text-slate-600 dark:text-slate-300'>
          Choose your font theme:
        </p>
      </div>
      <div className='w-full flex flex-col gap-5'>
        {fontTheme.map((item) => (
          <div
            key={item.id}
            className={`w-full flex items-center justify-between space-x-2 px-4 py-5 
              border rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700
              ${font === item.value && 'dark:bg-slate-700 bg-slate-200'}`}
            onClick={() => handleChoseFont(item.value)}
          >
            <div className='w-full flex items-center gap-5'>
              <item.icon style={{ fontSize: '25px' }} />
              <div className='flex flex-col gap-1'>
                <Label htmlFor='r1'>{item.title}</Label>
                <p className='dark:text-slate-400 text-slate-700'>
                  {item.desc}
                </p>
              </div>
            </div>
            <div
              className={`w-5 h-5 border border-slate-500 rounded-full ${
                font === item.value
                  ? 'bg-slate-800 border-4 dark:bg-slate-200'
                  : ''
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FontThemeSetting;
