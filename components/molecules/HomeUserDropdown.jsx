import Image from 'next/image';
import Link from 'next/link';

export default function HomeUserDropdown({ isLogin, user, isUserDropdownOpen, handleUserDropdown, handleSignOut }) {
  if (!isLogin) {
    return (
      <div className="flex lg:order-last">
        <Link href="/login" className="flex gap-2 hover:bg-gray-700 px-4 py-2 font-medium rounded-lg focus:ring-4 focus:ring-gray-800">
          <svg className="w-6 fill-main-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" /></svg>
          Login
        </Link>
        <Link href="/register" className="duration-300 mx-0 px-4 py-2 font-medium hidden lg:block rounded-lg hover:bg-gray-700">
          Register
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* user-dropdown-button */}
      <button
        type="button"
        onClick={handleUserDropdown}
        className="lg:order-last flex mr-2.5 lg:mr-0 text-sm  rounded-full ring-2 ring-gray-600 active:ring-4"
      >
        <span className="sr-only">Open user menu</span>
        <Image width="200" height="200" className="w-12 h-12 lg:w-[52px] lg:h-[52px] rounded-full" src="/avatar2.svg" alt="user photo" />
      </button>

      {/* user-dropdown-menu */}
      <div className={`${!isUserDropdownOpen ? 'opacity-0 invisible ' : 'opacity-100 visible'} absolute top-[90%] right-0 z-50 w-fit text-base list-none  divide-y rounded-lg shadow bg-gray-700 divide-gray-600 duration-300`}>
        <div className="px-4 py-3">
          <span className="block text-sm text-white">{user.displayName}</span>
          <span className="block text-sm font-medium truncate text-gray-400">{user.email}</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li><Link href="/app/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Dashboard</Link></li>
          <li><Link href="/app" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Table</Link></li>
          <li><Link href="/app/profile" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Profile</Link></li>
          <li>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}