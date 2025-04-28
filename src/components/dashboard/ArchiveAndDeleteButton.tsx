'use client';
import { ArchiveIcon, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AsyncNoteAction = () => Promise<void>;

interface ArchiveAndDeleteButtonProps {
  loading: boolean;
  handleArchiveNote: AsyncNoteAction;
  handleDeleteNote: AsyncNoteAction;
}

const ArchiveAndDeleteButton = ({
  handleArchiveNote,
  handleDeleteNote,
  loading
}: ArchiveAndDeleteButtonProps) => {
  return (
    <div className='flex items-center justify-center space-x-2 min-md:mt-5'>
      <Button
        variant={'ghost'}
        className='w-auto cursor-pointer'
        onClick={handleArchiveNote}
        disabled={loading}
      >
        <ArchiveIcon size={30} color='green' />
        <span className='text-green-500 max-md:hidden'>Archive Note</span>
      </Button>
      <Button
        variant={'ghost'}
        className='w-auto cursor-pointer'
        onClick={handleDeleteNote}
        disabled={loading}
      >
        <Trash size={30} color='red' />
        <span className='text-red-500 max-md:hidden'>Delete Note</span>
      </Button>
    </div>
  );
};

export default ArchiveAndDeleteButton;
