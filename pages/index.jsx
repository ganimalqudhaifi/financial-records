import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import {
  database, onValue, ref,
} from '../config/firebase';
import { useGlobalContext } from '../context';
import { storage } from '../utils';

export default function Home() {
  const {
    state, changeIsLoginState, changeUserState, changePersonalInformationState,
  } = useGlobalContext();
  const {
    personalInformation, isDemo, isLogin, user,
  } = state;
  const { firstName, lastName } = personalInformation;

  const [isActive, setIsActive] = useState(false);
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const { email } = user;
  const displayName = isLogin && `${firstName} ${lastName}`;

  useEffect(() => {
    const uid = storage.getUID();
    uid !== null && changeIsLoginState(true);
    isLogin && changeUserState(storage.getItem('user'));

    if (!isDemo) {
      const personalInformationRef = ref(database, `users/${uid}/personalInformation`);
      onValue(personalInformationRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          changePersonalInformationState(data);
        } else {
          storage.removeItem('user');
          changeIsLoginState(false);
        }
      }, {
        onlyOnce: true,
      });
    }
  }, [isLogin, isDemo]);

  return (
    <>
      <Head>
        <title>Financial Records - Home</title>
      </Head>

      <div className="flex flex-col px-4 sm:px-[5%] md:px-[6%] lg:px-[8%] w-full min-h-[100vh] bg-bg-color text-text-color scroll-smooth">
        <header className="sticky flex flex-wrap justify-between py-6 duration-500 items-center">
          <Link href="/" className="flex">
            <svg className="fill-main-color mr-2.5 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zm-2 9h-2v-4h2v4zM5 7a1.001 1.001 0 0 1 0-2h13v2H5z" /></svg>
            <div className="flex flex-col items-start font-semibold text-center">
              <span className="text-md sm:text-lg font-bold">Financial</span>
              <span className="text-xs leading-7 mt-[-10px]">Records</span>
            </div>
          </Link>

          <div className="flex items-center lg:order-2">
            {
            !isLogin
              ? (
                <>
                  <Link href="/login" className="flex gap-2 hover:bg-gray-700 px-4 py-2 font-medium rounded-lg focus:ring-4 focus:ring-gray-800">
                    <svg className="w-6 fill-main-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" /></svg>
                    <span className="duration-300">Login</span>
                  </Link>
                  <Link href="/register" className="duration-300 mx-0 px-4 py-2 font-medium hidden lg:block rounded-lg hover:bg-gray-700">Register</Link>
                </>
              )
              : (
                <button type="button" onClick={() => { setIsActive(false); setIsActiveDropdown(!isActiveDropdown); }} className="flex mr-3 md:mr-0 text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600">
                  <span className="sr-only">Open user menu</span>
                  <Image width="200" height="200" className="w-12 h-12 rounded-full" src="/avatar.jpg" alt="user photo" />
                </button>
              )
            }
            <button
              type="button"
              onClick={() => { setIsActiveDropdown(false); setIsActive(!isActive); }}
              className="p-2 flex items-center justify-center cursor-pointer lg:hidden"
            >
              <span className={`relative w-5 h-6 flex items-center justify-center before:content-[''] before:absolute before:w-full before:h-0.5 before:bg-white before:duration-500 ${!isActive ? 'before:translate-y-[-4px]' : 'before:translate-y-0 before:rotate-[225deg]'} after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:duration-500 ${!isActive ? 'after:translate-y-[4px]' : 'after:translate-y-0 after:rotate-[-225deg]'}`} />
            </button>
          </div>

          <div className="lg:order-4 w-full h-0 grid justify-items-end">
            <div className={`${!isActiveDropdown ? 'opacity-0 invisible ' : 'opacity-100 visible'} z-50 w-fit my-4 text-base list-none  divide-y rounded-lg shadow bg-gray-700 divide-gray-600 duration-300`}>
              <div className="px-4 py-3">
                <span className="block text-sm text-white">{displayName}</span>
                <span className="block text-sm font-medium truncate text-gray-400">{email}</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link href="/app/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href="/app" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Table</Link>
                </li>
                <li>
                  <Link href="/app/profile" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Profile</Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem('user');
                      sessionStorage.removeItem('user');
                      window.location.reload();
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <nav className="lg:order-1 w-full lg:w-auto h-0 lg:h-auto">
            <ul className="w-full mt-4 lg:mt-0 rounded-lg overflow-hidden lg:flex ">
              <li className={`${!isActive ? 'opacity-0 invisible' : 'opacity-100 visible'}duration-500 lg:opacity-100 lg:visible last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]`}><Link href="#" className="block px-5 py-[10px] text-gray-200 font-medium duration-200 bg-gray-700 hover:bg-gray-600 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]">Home</Link></li>
              <li className={`${!isActive ? 'opacity-0 invisible' : 'opacity-100 visible'}duration-500 lg:opacity-100 lg:visible last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]`}><Link href="#About" className="block px-5 py-[10px] text-gray-200 font-medium duration-200 bg-gray-700 hover:bg-gray-600 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]">About</Link></li>
              <li className={`${!isActive ? 'opacity-0 invisible' : 'opacity-100 visible'}duration-500 lg:opacity-100 lg:visible last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]`}><Link href="#Contact" className="block px-5 py-[10px] text-gray-200 font-medium duration-200 bg-gray-700 hover:bg-gray-600 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]">Contact</Link></li>
              <li className={`${!isActive ? 'opacity-0 invisible' : 'opacity-100 visible'}duration-500 lg:opacity-100 lg:visible last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]`}><Link href="/register" className="block px-5 py-[10px] text-gray-200 font-medium duration-200 bg-gray-700 hover:bg-gray-600 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]">Register</Link></li>
            </ul>
          </nav>
        </header>

        <main className="mt-10 flex-1 flex flex-col gap-y-10">
          <article className="px-6 md:px-12 grid sm:grid-cols-2">
            <section className="my-auto">
              <h1 className="text-5xl text-main-color font-bold">Financial Records.</h1>
              <p className="text-md mt-1">Track your financial flow with financial records</p>
              <Link className="inline-block px-4 py-2 mt-6 rounded-md text-lg bg-main-color text-bg-color font-semibold hover:scale-105 duration-200 active:scale-100" href="/demo">Try Demo</Link>
            </section>
            <section className="hidden sm:grid place-items-center">
              <Image src="/vector1.svg" alt="vector" width={400} height={0} />
            </section>
          </article>

          <article id="About" className="px-6 md:px-12 min-h-screen flex flex-col items-center">
            <section className="my-auto grid grid-cols-2 gap-x-8">
              <h1 className="pb-12 text-5xl text-main-color font-bold text-center col-span-2">About Me</h1>
              <p className="text-md mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eligendi nostrum amet explicabo labore, quis quam vel ducimus voluptatem quos fugiat. Mollitia saepe pariatur deleniti? Architecto mollitia nulla incidunt quidem.</p>
              <p className="text-md mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eligendi nostrum amet explicabo labore, quis quam vel ducimus voluptatem quos fugiat. Mollitia saepe pariatur deleniti? Architecto mollitia nulla incidunt quidem.</p>
            </section>
          </article>

          <article className="min-h-screen grid items-center">
            <section id="Contact" className="py-6 text-gray-50">
              <h1 className="pb-12 text-5xl text-main-color font-bold text-center col-span-2">Contact</h1>
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
              <Link href=""><div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full"><Image alt="nextjs logo" width={28} height={28} src="/icons/nextjslogo.png" /></div></Link>
              <Link href=""><div className="w-8 h-8 bg-transparent flex items-center justify-center rounded-full"><Image alt="tailwind logo" width={28} height={28} src="/icons/tailwindlogo.png" /></div></Link>
              <Link href=""><div className="w-8 h-8 bg-transparent flex items-center justify-center rounded-full"><Image alt="firebase logo" width={28} height={28} src="/icons/firebaselogo.png" /></div></Link>
            </div>
          </div>
        </footer>

        <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
        <Script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
      </div>
    </>
  );
}
