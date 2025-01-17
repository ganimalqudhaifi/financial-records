import Image from "next/image";
import Link from "next/link";
import { Offline, Online } from "react-detect-offline";
import { IoPerson } from "react-icons/io5";

interface HomeUserDropdownProps {
  user: any;
  isUserDropdownOpen: boolean;
  handleUserDropdown: () => void;
  handleSignOut: () => void;
}

export default function HomeUserDropdown({
  user,
  isUserDropdownOpen,
  handleUserDropdown,
  handleSignOut,
}: HomeUserDropdownProps) {
  if (!user) {
    return (
      <div className="flex justify-self-end lg:order-last">
        <Link
          href="/login"
          className="flex gap-2 px-4 py-2 font-medium rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-800"
        >
          <IoPerson className="w-6 h-6 fill-main-color" />
          Login
        </Link>
        <Link
          href="/register"
          className="duration-300 mx-0 px-4 py-2 font-medium hidden rounded-lg hover:bg-gray-700 lg:block"
        >
          Register
        </Link>
      </div>
    );
  }

  return (<>
    {/* user-dropdown-button */}
    <button
      type="button"
      onClick={handleUserDropdown}
      className="relative flex justify-self-end mr-2.5 text-sm rounded-full ring-2 ring-[rgb(47,50,51)] duration-500 active:scale-110  lg:order-last lg:mr-0"
    >
      <span className="sr-only">Open user menu</span>
      <Image
        width="200"
        height="200"
        className="w-12 h-12 rounded-full grayscale-[30%] lg:w-[52px] lg:h-[52px]"
        src={user.photoURL}
        alt="user photo"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      <Online>
        <div className="absolute bottom-0 -right-1.5 w-4 h-4 bg-green-500 border-2 border-bg-color rounded-full" />
      </Online>
      <Offline>
        <div className="absolute bottom-0 -right-1.5 w-4 h-4 bg-gray-500 border-2 border-bg-color rounded-full" />
      </Offline>
    </button>
    {/* user-dropdown-menu */}
    <div
      className={`${!isUserDropdownOpen ? "opacity-0 invisible -translate-y-1.5" : "opacity-100 visible translate-y-0"} absolute top-full right-4 z-50 w-fit text-base list-none  divide-y rounded-lg shadow-xl bg-gray-700 divide-gray-600 duration-300 sm:right-8 lg:right-[7%]`}
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-white">{user.displayName}</span>
        <span className="block text-sm font-medium truncate text-gray-400">
          {user.email}
        </span>
      </div>
      <ul className="py-2" aria-labelledby="user-menu-button">
        <li>
          <Link
            href="/app/dashboard"
            className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/app"
            className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
          >
            Table
          </Link>
        </li>
        <li>
          <Link
            href="/app/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
          >
            Profile
          </Link>
        </li>
        <li>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  </>);
}
