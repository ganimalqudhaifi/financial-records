import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGlobalContext } from '../../../context';
import { userSignOut } from '../../../utils';
import { AccountsDropdown } from '../../molecules';

export default function AppSidebar({ user }) {
  const { state } = useGlobalContext();
  const { isDemo } = state;

  const [isActive, setIsActive] = useState(false);
  const [ctaButton, setCtaButton] = useState(false);

  const handleSignOut = () => {
    userSignOut();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsActive(true)}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <svg
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
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
                src="/avatar/boy_01.svg"
                alt="Rounded avatar"
                className="w-20 h-20 rounded-full"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-1.5 w-5 h-5 text-gray-300 stroke-1 stroke-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
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
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-slate-400 transition duration-75 dark:text-gray-400 group-hover:text-slate-300 dark:group-hover:text-white"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                // eslint-disable-next-line quotes
                href={`${!isDemo ? "/app" : "/demo"}`}
                className="flex items-center p-2 text-base font-normal text-slate-300 rounded-lg hover:bg-slate-800"
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 text-slate-400 transition duration-75 dark:text-gray-400 group-hover:text-slate-300 dark:group-hover:text-white"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="ml-3">Table</span>
              </Link>
            </li>
            <li>
              <Link
                href={`${!isDemo ? '/app/profile' : '/login'}`}
                className="flex items-center p-2 text-base font-normal text-slate-300 rounded-lg hover:bg-slate-800"
                disabled
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 text-slate-400 transition duration-75 dark:text-gray-400 group-hover:text-slate-300 dark:group-hover:text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
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
                className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-blue-400 p-1  inline-flex h-6 w-6 bg-blue-900 text-blue-400 hover:bg-blue-800"
              >
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="mb-3 text-sm  text-blue-400">
              Preview the dashboard navigation! For some reason profile page is not
              available in demo.
            </p>
            <Link href="/" className="text-sm  underline font-medium text-blue-400 hover:text-blue-300">Back to Home Page </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
