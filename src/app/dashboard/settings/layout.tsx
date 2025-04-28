import SettingsMenu from '@/components/dashboard/SettingsMenu';

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-full flex '>
      <SettingsMenu /> {children}
    </div>
  );
};

export default SettingLayout;
