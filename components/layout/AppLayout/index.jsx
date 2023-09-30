import { AppProvider } from '../../../context';
import { AppSidebar } from '../../organisms';

export default function AppLayout({ children, ...rest }) {
  return (
    <AppProvider>
      <div className="flex flex-col w-full h-full overflow-auto bg-gray-300/60">
        <div className="lg:flex flex-1 w-full">
          <AppSidebar {...rest} />
          {children}
        </div>
      </div>
    </AppProvider>
  );
}
