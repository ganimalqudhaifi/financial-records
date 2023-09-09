import Link from 'next/link';

export default function HomeNavigationDropdown({ isNavigationDropdownOpen, handleNavigationDropdown }) {
  return (
    <>
      {/* navigation-button */}
      <button
        type="button"
        onClick={handleNavigationDropdown}
        className="p-2 flex items-center justify-center cursor-pointer lg:hidden "
      >
        <span className={`relative w-5 h-6 flex items-center justify-center before:content-[''] before:absolute before:w-full before:h-0.5 before:bg-white before:duration-500 ${!isNavigationDropdownOpen ? 'before:translate-y-[-4px]' : 'before:translate-y-0 before:rotate-[225deg]'} after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:duration-500 ${!isNavigationDropdownOpen ? 'after:translate-y-[4px]' : 'after:translate-y-0 after:rotate-[-225deg]'}`} />
      </button>

      {/* navigation-menu */}
      <nav className="absolute top-[90%] lg:static w-full lg:w-auto h-0 lg:h-auto">
        <ul className="w-full lg:mt-0 rounded-lg overflow-hidden lg:flex ">
          <li className={`${!isNavigationDropdownOpen ? 'opacity-0 invisible' : 'opacity-100 visible'} duration-500 lg:opacity-100 lg:visible last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]`}><Link href="#" className="block px-5 py-[10px] text-gray-200 font-medium duration-200 bg-gray-700 hover:bg-gray-600 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]">Home</Link></li>
          <li className={`${!isNavigationDropdownOpen ? 'opacity-0 invisible' : 'opacity-100 visible'} duration-500 lg:opacity-100 lg:visible last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]`}><Link href="#About" className="block px-5 py-[10px] text-gray-200 font-medium duration-200 bg-gray-700 hover:bg-gray-600 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]">About</Link></li>
          <li className={`${!isNavigationDropdownOpen ? 'opacity-0 invisible' : 'opacity-100 visible'} duration-500 lg:opacity-100 lg:visible last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]`}><Link href="#Practice" className="block px-5 py-[10px] text-gray-200 font-medium duration-200 bg-gray-700 hover:bg-gray-600 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]">Practice</Link></li>
          <li className={`${!isNavigationDropdownOpen ? 'opacity-0 invisible' : 'opacity-100 visible'} duration-500 lg:opacity-100 lg:visible last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]`}><Link href="/register" className="block px-5 py-[10px] text-gray-200 font-medium duration-200 bg-gray-700 hover:bg-gray-600 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]">Register</Link></li>
        </ul>
      </nav>
    </>
  );
}
