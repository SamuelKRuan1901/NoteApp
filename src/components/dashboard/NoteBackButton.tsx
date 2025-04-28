import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  href: string;
  label: string;
}

const NoteBackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button
      variant={'outline'}
      className='font-normal w-24'
      size={'sm'}
      asChild
    >
      <Link href={href}>
        {' '}
        <ArrowLeft />
        {label}
      </Link>
    </Button>
  );
};

export default NoteBackButton;
