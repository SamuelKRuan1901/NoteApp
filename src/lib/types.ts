import { ParsedUrlQuery } from 'querystring';

export interface Note {
  _id: string;
  title: string;
  tags: string[];
  content: string;
  isArchived: boolean;
  lastEdited: string;
}

// create type for params
interface NoteParams extends ParsedUrlQuery {
  slug: string;
}
export interface NoteSinglePageProps {
  params: NoteParams;
}
