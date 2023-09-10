import { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useGlobalContext } from '../context';
import { checkUserAuth, userSignOut } from '../utils';
import { HomeAboutMe, HomeBanner, HomeFooter, HomeNavigationDropdown, HomePractice, HomeUserDropdown, Logo } from '../components';

export default function Home() {
  const {
    state,
    changeIsLoginState,
    changeUserState,
  } = useGlobalContext();

  const [isNavigationDropdownOpen, setisNavigationDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setisUserDropdownOpen] = useState(false);

  const { isLogin, user } = state;

  useEffect(() => {
    checkUserAuth((user) => {
      if (user) {
        const { displayName, email, phoneNumber, photoURL, emailVerified, uid } = user;
        changeIsLoginState(true);
        changeUserState({ displayName, email, phoneNumber, photoURL, emailVerified, uid });
      } else {
        changeIsLoginState(false);
      }
    });
  }, []);

  const handleSignOut = () => {
    userSignOut();
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

      <div className="flex flex-col px-4 sm:px-[5%] md:px-[6%] lg:px-[8%] w-full min-h-[100vh] bg-bg-color text-text-color scroll-smooth">
        <header className="sticky flex lg:grid grid-cols-3 justify-items-center py-6 duration-500 items-center">
          <Logo />
          <HomeUserDropdown
            isLogin={isLogin}
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

        <main className="my-10 flex-1 flex flex-col gap-y-10">
          <HomeBanner />
          <HomeAboutMe />
          <HomePractice />
        </main>

        <HomeFooter />
        <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
        <Script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
      </div>
    </>
  );
}
