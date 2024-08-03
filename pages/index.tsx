import cookie from "cookie";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  HomeAboutMe,
  HomeBanner,
  HomeFooter,
  HomeNavigationDropdown,
  HomePractice,
  HomeUserDropdown,
  Logo,
} from "@/components";
import { getUser } from "@/lib/firebase/admin";
import { verifyToken } from "@/lib/jwt";
import { fetchUserLogOut } from "@/lib/redux/features/user/userSlice";
import { AppDispatch } from "@/lib/redux/store";
import { DataUser } from "@/types";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return {
      props: {
        user: null,
      },
    };
  }

  const jwtPayload = verifyToken(token);
  const uid = jwtPayload.uid as string;

  const dataUser = await getUser(uid);

  if (!dataUser) {
    return {
      props: {
        user: null,
      },
    };
  }

  const user = {
    uid: dataUser.uid,
    email: dataUser.email,
    displayName: dataUser.displayName,
    photoURL: dataUser.photoURL,
    phoneNumber: dataUser.phoneNumber || null,
  };

  return {
    props: {
      user,
    },
  };
};

export default function Home({ user }: { user: DataUser }) {
  const dispatch: AppDispatch = useDispatch();

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
          <HomePractice />
        </main>

        <HomeFooter />
      </div>
    </>
  );
}
