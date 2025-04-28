'use server';
import { StickyNote } from 'lucide-react';

const SettingsPage = async () => {
  return (
    <div className='w-2/3 h-full flex flex-col items-center justify-center max-md:hidden'>
      <StickyNote size={200} strokeWidth={1} />
      <p className='text-lg font-semibold'>Take Your Notes, Keep Your Ideas</p>
    </div>
    // </div>
  );
};

export default SettingsPage;
