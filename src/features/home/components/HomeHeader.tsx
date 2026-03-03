"use client";

import { useState } from "react";
import HomeNavigationDropdown from "./HomeNavigationDropdown";
import HomeUserDropdown from "./HomeUserDropdown";
import Logo from "./Logo";

export default function HomeHeader() {
  const [isNavigationDropdownOpen, setisNavigationDropdownOpen] =
    useState(false);
  const [isUserDropdownOpen, setisUserDropdownOpen] = useState(false);

  const handleUserDropdown = () => {
    setisNavigationDropdownOpen(false);
    setisUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleNavigationDropdown = () => {
    setisUserDropdownOpen(false);
    setisNavigationDropdownOpen(!isNavigationDropdownOpen);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center max-w-7xl mx-auto px-4 py-3.5 bg-bg-color border-b border-neutral-800 shadow-md duration-500 sm:px-8 md:py-4 lg:px-20 lg:grid lg:grid-cols-3 lg:justify-items-center">
      <Logo />
      <HomeUserDropdown
        isUserDropdownOpen={isUserDropdownOpen}
        handleUserDropdown={handleUserDropdown}
      />
      <HomeNavigationDropdown
        isNavigationDropdownOpen={isNavigationDropdownOpen}
        handleNavigationDropdown={handleNavigationDropdown}
      />
    </header>
  );
}
