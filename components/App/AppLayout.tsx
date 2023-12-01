import AppSidebar from './AppSidebar';

export default function AppLayout({ children, user, ...rest }) {
  return (
    <div className="flex flex-col w-full h-full overflow-auto bg-gray-300/60">
      <div className="lg:flex flex-1 w-full">
        <AppSidebar user={user} {...rest} />
        {children}
      </div>
    </div>
  );
}
