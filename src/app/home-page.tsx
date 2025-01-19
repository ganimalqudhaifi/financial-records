"use client";

import Head from "next/head";
import { useState } from "react";
import {
  HomeAboutMe,
  HomeBanner,
  HomeFooter,
  HomeNavigationDropdown,
  HomeUserDropdown,
  Logo,
} from "@/components";
import HomeBudgetingGuide from "@/components/Home/HomeBudgetingGuide";
import {
  fetchUserLogOut,
  selectUser,
} from "@/lib/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

export default function HomePage() {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [isNavigationDropdownOpen, setisNavigationDropdownOpen] =
    useState(false);
  const [isUserDropdownOpen, setisUserDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    dispatch(fetchUserLogOut());
    setisUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleUserDropdown = () => {
    setisNavigationDropdownOpen(false);
    setisUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleNavigationDropdown = () => {
    setisUserDropdownOpen(false);
    setisNavigationDropdownOpen(!isNavigationDropdownOpen);
  };

  return (
    <>
      <Head>
        <title>Financial Records - Home</title>
      </Head>

      <div className="w-full min-h-[100vh] bg-bg-color text-text-color">
        <header className="sticky top-0 z-50 flex items-center max-w-7xl mx-auto px-4 py-3.5 bg-bg-color border-b border-neutral-800 shadow-md duration-500 sm:px-8 md:py-4 lg:px-20 lg:grid lg:grid-cols-3 lg:justify-items-center">
          <Logo />
          <HomeUserDropdown
            user={user}
            isUserDropdownOpen={isUserDropdownOpen}
            handleUserDropdown={handleUserDropdown}
            handleSignOut={handleSignOut}
          />
          <HomeNavigationDropdown
            isNavigationDropdownOpen={isNavigationDropdownOpen}
            handleNavigationDropdown={handleNavigationDropdown}
          />
        </header>

        <main className="flex flex-col flex-1 gap-y-12 items-center mb-10 sm:px-[5%] lg:px-[8%] overflow-x-hidden">
          <HomeBanner />
          <HomeAboutMe />
          <HomeBudgetingGuide />
        </main>

        <HomeFooter />
      </div>
    </>
  );
}
