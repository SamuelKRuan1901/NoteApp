'use server';
import { getNote } from '@/actions/notes';
import MobileNoteNav from '@/components/dashboard/MobileNoteNav';
import NoteForm from '@/components/dashboard/NoteForm';
import { ParsedUrlQuery } from 'querystring';

// // create type for params
interface NoteParams extends ParsedUrlQuery {
  slug: string;
}
interface NoteSinglePageProps {
  params: NoteParams;
}

const NoteSinglePage = async ({ params }: NoteSinglePageProps) => {
  const { slug } = await params;
  const chosenNote = await getNote(slug);
  const chosenNoteParse = JSON.parse(JSON.stringify(chosenNote));

  return (
    <div className='w-full px-5 py-2 max-md:w-full'>
      <MobileNoteNav label={'Back'} href={'/dashboard'} id={slug} />
      {slug !== 'create-note' && (
        <NoteForm
          title={chosenNoteParse?.title}
          tags={chosenNoteParse?.tags}
          archived={chosenNoteParse?.isArchived}
          content={chosenNoteParse?.content}
          lastEdited={chosenNoteParse?.lastEdited}
          id={slug}
        />
      )}
      {slug === 'create-note' && <NoteForm id={slug} />}
    </div>
  );
};

export default NoteSinglePage;
