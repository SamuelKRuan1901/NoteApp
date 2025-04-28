'use client';
import NoteBackButton from '@/components/dashboard/NoteBackButton';
import ArchiveAndDeleteButton from '@/components/dashboard/ArchiveAndDeleteButton';
import { useContext, useEffect } from 'react';
import { NoteContext } from '@/contexts/NoteContext';

interface BackButtonProps {
  href: string;
  label: string;
  id: string;
}

const MobileNoteNav = ({ label, href, id }: BackButtonProps) => {
  const { handleArchive, handleDelete, isLoading, setNoteId } =
    useContext(NoteContext);

  useEffect(() => {
    setNoteId(id);
  });
  return (
    <div className='max-md:block hidden'>
      <div className='w-full px-1 py-2 flex items-center justify-between'>
        <NoteBackButton label={label} href={href} />
        {id !== 'createNote' && (
          <ArchiveAndDeleteButton
            handleArchiveNote={handleArchive}
            loading={isLoading}
            handleDeleteNote={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default MobileNoteNav;
