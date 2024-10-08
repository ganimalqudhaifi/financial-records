import Link from "next/link";

interface HomeNavigationDropdownProps {
  isNavigationDropdownOpen: boolean;
  handleNavigationDropdown: () => void;
}

export default function HomeNavigationDropdown({
  isNavigationDropdownOpen,
  handleNavigationDropdown,
}: HomeNavigationDropdownProps) {
  return (
    <>
      {/* navigation-button */}
      <button
        type="button"
        onClick={handleNavigationDropdown}
        className="p-2 flex items-center justify-center cursor-pointer lg:hidden "
      >
        <span
          className={`relative w-5 h-6 flex items-center justify-center before:content-[''] before:absolute before:w-full before:h-0.5 before:bg-white before:duration-500 ${!isNavigationDropdownOpen ? "before:translate-y-[-4px]" : "before:translate-y-0 before:rotate-[225deg]"} after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:duration-500 ${!isNavigationDropdownOpen ? "after:translate-y-[4px]" : "after:translate-y-0 after:rotate-[-225deg]"}`}
        />
      </button>

      {/* navigation-menu */}
      <nav
        className={`${!isNavigationDropdownOpen ? "opacity-0 invisible -translate-y-1.5 lg:translate-y-0" : "opacity-100 visible translate-y-0"} duration-500 lg lg:opacity-100 lg:visible absolute top-full inset-x-4 sm:inset-x-8 lg:static lg:w-auto h-0 lg:h-auto`}
      >
        <ul className="rounded-lg overflow-hidden shadow-lg lg:shadow-none lg:flex tracking-wide">
          <li className="last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]">
            <Link
              href="#"
              className="block px-5 py-[10px] text-gray-200 font-medium duration-200 bg-gray-700 hover:bg-gray-600 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]"
              onClick={handleNavigationDropdown}
            >
              Home
            </Link>
          </li>
          <li className="last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]">
            <Link
              href="#About"
              className="block px-5 py-[10px] text-gray-200 font-medium duration-200 bg-gray-700 hover:bg-gray-600 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]"
              onClick={handleNavigationDropdown}
            >
              About
            </Link>
          </li>
          <li className="last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]">
            <Link
              href="#Practice"
              className="block px-5 py-[10px] text-gray-200 font-medium duration-200 bg-gray-700 hover:bg-gray-600 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]"
              onClick={handleNavigationDropdown}
            >
              Budgeting Guide
            </Link>
          </li>
          <li className="last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]">
            <Link
              href="/register"
              className="block px-5 py-[10px] text-gray-200 font-medium duration-200 bg-gray-700 hover:bg-gray-600 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]"
              onClick={handleNavigationDropdown}
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
