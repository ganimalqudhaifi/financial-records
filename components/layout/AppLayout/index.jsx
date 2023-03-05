import { AppSidebar, Footers } from '../../organisms';

export default function AppLayout({ children, ...rest }) {
  return (
    <div className="flex flex-col w-full h-full bg-gray-300/60">
      <div className="lg:flex flex-1 w-full">
        <AppSidebar {...rest} />
        {children}
      </div>
      <div className="lg:ml-64">
        <Footers />
      </div>
    </div>
  );
}
