import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useGlobalContext } from '../context';
import { checkUserAuth, userSignOut } from '../utils';
import { HomeBanner, HomeNavigationDropdown, HomeUserDropdown, Logo } from '../components';

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
        <header className="sticky flex flex-wrap lg:justify-between py-6 duration-500 items-center">
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

        <main className="mt-10 flex-1 flex flex-col gap-y-10">
          <HomeBanner />
          <article id="About" className="px-6 md:px-12 min-h-screen flex flex-col items-center">
            <section className="my-auto grid grid-cols-2 gap-x-8">
              <h2 className="pb-12 text-5xl text-main-color font-bold text-center col-span-2">About Me</h2>
              <p className="text-md mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eligendi nostrum amet explicabo labore, quis quam vel ducimus voluptatem quos fugiat. Mollitia saepe pariatur deleniti? Architecto mollitia nulla incidunt quidem.</p>
              <p className="text-md mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eligendi nostrum amet explicabo labore, quis quam vel ducimus voluptatem quos fugiat. Mollitia saepe pariatur deleniti? Architecto mollitia nulla incidunt quidem.</p>
            </section>
          </article>

          <article className="min-h-screen grid items-center">
            <section id="Contact" className="py-6 text-gray-50">
              <h2 className="pb-12 text-5xl text-main-color font-bold text-center col-span-2">Contact</h2>
              <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                <div className="py-6 md:py-0 md:px-6">
                  <h1 className="text-4xl font-bold">Get in touch</h1>
                  <p className="pt-2 pb-4">Fill in the form to start a conversation</p>
                  <div className="space-y-4">
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>Depok, 16411 Jawa Barat</span>
                    </p>
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>+62 882-4693-xxxx</span>
                    </p>
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>ganimalqudaifi@gmail.com</span>
                    </p>
                  </div>
                </div>
                <form noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6 ng-untouched ng-pristine ng-valid">
                  <label className="block">
                    <span className="mb-1">Full name</span>
                    <input type="text" placeholder="John Doe" className="block p-2 w-full rounded-md shadow-sm border border-gray-300 focus:ring focus:ring-opacity-75 focus:gray-100 bg-bg-color" />
                  </label>
                  <label className="block">
                    <span className="mb-1">Email address</span>
                    <input type="email" placeholder="john@gmail.com" className="block p-2 w-full rounded-md shadow-sm border border-gray-300 focus:ring focus:ring-opacity-75 focus:gray-100 bg-bg-color" />
                  </label>
                  <label className="block">
                    <span className="mb-1">Message</span>
                    <textarea rows="3" className="block p-2 w-full rounded-md text-gray-400 border border-gray-300 focus:ring focus:ring-opacity-75 focus:gray-100 bg-bg-color" />
                  </label>
                  <button type="button" className="self-center px-8 py-3 text-lg rounded  focus:ring hover:ring focus:ring-opacity-75 bg-main-color text-bg-color focus:ring-purple-400 hover:ring-purple-400">Submit</button>
                </form>
              </div>
            </section>
          </article>
        </main>

        <footer className="flex flex-col md:flex-row px-4 dark:bg-gray-800 dark:text-gray-100">
          <div className="order-2 md:order-0 py-6 text-sm text-center text-gray-300 whitespace-nowrap">©2023 All rights reserved.</div>
          <div className="md:order-2 container flex flex-col md:flex-row justify-end gap-1 py-4 mx-auto space-y-1 lg:flex-row lg:space-y-0">
            <div className="flex items-center justify-center text-gray-300 mr-1">Powered by</div>
            <div className="flex items-center justify-center gap-0.5">
              <Link href="https://nextjs.org" target="_blank"><div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full"><Image alt="nextjs logo" width={28} height={28} src="/icons/nextjslogo.png" /></div></Link>
              <Link href="https://tailwindcss.com/" target="_blank"><div className="w-8 h-8 bg-transparent flex items-center justify-center rounded-full"><Image alt="tailwind logo" width={28} height={28} src="/icons/tailwindlogo.png" /></div></Link>
              <Link href="https://firebase.google.com" target="_blank"><div className="w-8 h-8 bg-transparent flex items-center justify-center rounded-full"><Image alt="firebase logo" width={28} height={28} src="/icons/firebaselogo.png" /></div></Link>
            </div>
          </div>
        </footer>

        <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
        <Script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
      </div>
    </>
  );
}
