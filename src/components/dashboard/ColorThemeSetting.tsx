'use client';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { colorTheme } from '@/lib/menuItems';
import { useTheme } from 'next-themes';

const ColorThemeSetting = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after the component has been mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering until after mounting to prevent mismatches
  if (!mounted) return null;

  return (
    <div className=' flex flex-col gap-5'>
      <div>
        <h1 className='font-bold'>Color Theme</h1>
        <p className='text-slate-600 dark:text-slate-300'>
          Choose your color theme:
        </p>
      </div>
      <div className='w-full flex flex-col gap-5'>
        {colorTheme.map((item) => (
          <div
            key={item.id}
            className={`w-full flex items-center justify-between space-x-2 px-4 py-5 
              border rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700
              ${theme === item.value ? 'dark:bg-slate-700 bg-slate-200' : ''}`}
            onClick={() => setTheme(item.value)}
          >
            <div className='w-full flex items-center gap-5'>
              <item.icon size={25} />
              <div className='flex flex-col gap-1'>
                <Label htmlFor='r1'>{item.title}</Label>
                <p className='dark:text-slate-400 text-slate-700'>
                  {item.desc}
                </p>
              </div>
            </div>

            <div
              className={`w-5 h-5 border border-slate-500 rounded-full ${
                theme === item.value
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

export default ColorThemeSetting;
