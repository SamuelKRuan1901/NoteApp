'use client';
interface CardWrapperProps {
  label: string;
  title: string;
  backButtonHref: string;
  backButtonLabel: string;
  children: React.ReactNode;
}
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import AuthHeader from './AuthHeader';
import BackButton from './BackButton';
const CardWrapper = ({
  label,
  title,
  backButtonHref,
  backButtonLabel,
  children
}: CardWrapperProps) => {
  return (
    <Card className='xl:w-1/4 md:w-1/2 sm:w-1/2 w-full shadow-md'>
      <CardHeader>
        <AuthHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
