import ChangePassword from '@/components/dashboard/ChangePassword';
import ColorThemeSetting from '@/components/dashboard/ColorThemeSetting';
import FontThemeSetting from '@/components/dashboard/FontThemeSetting';
import NoteBackButton from '@/components/dashboard/NoteBackButton';

const SettingsSinglePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  return (
    <div className='w-2/3 h-full max-lg:w-full p-5 max-md:px-5'>
      <div className='w-full pt-2 pb-5 max-lg:w-full lg:hidden'>
        <NoteBackButton label={'Back'} href={'/dashboard/settings'} />
      </div>
      {slug === 'color-theme' && <ColorThemeSetting />}
      {slug === 'font-theme' && <FontThemeSetting />}
      {slug === 'change-password' && <ChangePassword />}
    </div>
  );
};

export default SettingsSinglePage;
