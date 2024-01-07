import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { TbLogout, TbChartPieFilled } from 'react-icons/tb';
import { BiSolidGridAlt, BiSolidUser, BiX } from 'react-icons/bi';
import { HiMiniBars3BottomLeft } from 'react-icons/hi2';

import { useGlobalContext } from '../../context/GlobalContext';
import { userSignOut } from '../../utils';
import { useAccounts, useDatabaseObserver } from '../../hooks';

import AccountsDropdown from './AccountsDropdown';
import { IDataUser } from '../../types';

type AppSidebarProps = {
  user: IDataUser
}

export default function AppSidebar({ user }: AppSidebarProps) {
  const { setAccounts } = useAccounts();
  const { state } = useGlobalContext();
  const { isDemo } = state;

  const [isActive, setIsActive] = useState(false);
  const [ctaButton, setCtaButton] = useState(false);

  const handleSignOut = () => {
    userSignOut();
  };

  useDatabaseObserver('accounts', (data) => {
    setAccounts(data);
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setIsActive(true)}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <HiMiniBars3BottomLeft className="w-6 h-6" />
      </button>

      <div
        onClick={() => setIsActive(false)}
        className={`fixed top-0 left-0 z-30 w-full h-screen bg-gray-900/50 ${!isActive && 'hidden'} lg:hidden`}
      />

      <aside className={`fixed shrink-0 top-0 left-0 z-40 w-64 h-screen transition-transform ${!isActive && '-translate-x-full'} lg:translate-x-0`}>
        <div className="no-scrollbar h-full px-3 py-4 overflow-y-auto bg-slate-900 divide-y-[1px] divide-gray-700">
          <div className=" w-full flex flex-col items-center">
            <div className="relative mb-4">
              <Image
                width="200"
                height="200"
                src={user.photoURL || '/avatar/boy_01.svg'}
                alt="Rounded avatar"
                className="w-20 h-20 rounded-full grayscale-[30%]"
              />
              <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-2 border-bg-color rounded-full z-10" />
              <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-2 border-bg-color rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
            </div>
            <p className="text-white text-xl font-semibold capitalize">{user.displayName}</p>
            <p className="text-gray-400 text-md font-light">{user.email}</p>
            <Link
              href="/"
              onClick={handleSignOut}
              className="flex justify-center items-center my-5 px-5 py-2.5 w-full text-base font-normal text-slate-300 rounded-lg hover:bg-slate-800 border-[1px] border-gray-700"
            >
              <TbLogout className="mr-1.5 w-5 h-5 text-gray-300 stroke-3 stroke-gray-400" />
              <span className="text-gray-400 text-sm font-medium">Logout</span>
            </Link>
          </div>
          <div>
            <AccountsDropdown />
          </div>
          <ul className="pt-5 space-y-2">
            <li>
              <Link
                href={`${!isDemo ? '/app/dashboard' : '/demo/dashboard'}`}
                className="flex items-center p-2 text-base font-normal text-slate-300 rounded-lg hover:bg-slate-800"
              >
                <TbChartPieFilled className="w-6 h-6 text-slate-400 transition duration-75 dark:text-gray-400 group-hover:text-slate-300 dark:group-hover:text-white" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                // eslint-disable-next-line quotes
                href={`${!isDemo ? '/app' : '/demo'}`}
                className="flex items-center p-2 text-base font-normal text-slate-300 rounded-lg hover:bg-slate-800"
              >
                <BiSolidGridAlt className="flex-shrink-0 w-6 h-6 text-slate-400 transition duration-75 dark:text-gray-400 group-hover:text-slate-300 dark:group-hover:text-white" />
                <span className="ml-3">Table</span>
              </Link>
            </li>
            <li>
              <Link
                href={`${!isDemo ? '/app/profile' : '/demo'}`}
                className="flex items-center p-2 text-base font-normal text-slate-300 rounded-lg hover:bg-slate-800"
              >
                <BiSolidUser className="flex-shrink-0 w-6 h-6 text-slate-400 transition duration-75 dark:text-gray-400 group-hover:text-slate-300 dark:group-hover:text-white" />
                <span className="ml-3">Profile</span>
              </Link>
            </li>
          </ul>

          <div className={`${isDemo ? 'block' : 'hidden'} ${ctaButton && 'invisible'} p-4 mt-6 rounded-lg bg-blue-900`}>
            <div className="flex items-center mb-3">
              <span className=" text-sm font-semibold mr-2 px-2.5 py-0.5 rounded bg-orange-200 text-orange-900">Beta</span>
              <button
                type="button"
                data-dismiss-target="#dropdown-cta"
                aria-label="Close"
                onClick={() => setCtaButton(!ctaButton)}
                className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 inline-flex h-7 w-7 bg-blue-900 text-blue-400 hover:bg-blue-800"
              >
                <span className="sr-only">Close</span>
                <BiX className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-3 text-sm  text-blue-400">
              Please login to use the profile features! For some reason profile page is not available in demo.
            </p>
            <Link href="/" className="text-sm  underline font-medium text-blue-400 hover:text-blue-300">Back to Home Page </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
