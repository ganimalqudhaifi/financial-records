import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { userSignOut } from '../utils';
import { HomeAboutMe, HomeBanner, HomeFooter, HomeNavigationDropdown, HomePractice, HomeUserDropdown, Logo } from '../components';
import { useAuthContext } from '../context/AuthContext';

export async function getServerSideProps({ req }) {
  const { user } = req.cookies;
  if (user) {
    return { props: { user: JSON.parse(user) } };
  }
  return { props: { } };
}

export default function Home() {
  const { user } = useAuthContext();

  const [isNavigationDropdownOpen, setisNavigationDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setisUserDropdownOpen] = useState(false);

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

      <div className="w-full min-h-[100vh] bg-bg-color text-text-color">
        <header className="sticky top-0 z-50 flex lg:grid grid-cols-3 justify-items-center items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-3.5 md:py-4 bg-bg-color border-b border-neutral-800 shadow-md duration-500">
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

        <main className="flex flex-col flex-1 gap-y-12 items-center mb-10 sm:px-[5%] lg:px-[8%]">
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
