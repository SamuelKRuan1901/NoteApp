import { Button } from '@/components/ui/button';
import { Scroll } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <section
      className={`w-screen h-full flex flex-col 
    justify-center items-center gap-4 my-16 py-12 
    px-4 rounded-md text-center`}
    >
      <div className='min-w-1/3 h-auto flex flex-col justify-center items-center gap-4'>
        <Scroll size={80} />
        <h1 className='text-4xl'>Welcome to the Note Take App</h1>
        <p className='text-lg text-slate-600 dark:text-slate-400'>
          This is a simple note taking app built with Next.js and Tailwind CSS.
        </p>
        <Button asChild size={'lg'}>
          <Link href={'/auth/login'}>Get start</Link>
        </Button>
      </div>
    </section>
  );
}
