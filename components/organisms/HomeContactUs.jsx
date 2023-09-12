import { useState } from 'react';

export default function HomeContactUs() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {/* before-clicked */}
      <div className={`${isClicked ? 'translate-x-full' : 'translate-x-0'} flex flex-col justify-center items-center gap-1 fixed bottom-20 lg:bottom-[20%] right-0 p-4 hover:pr-6 hover:delay-[0] rounded-l-[16px] text-[hsl(131,8%,95%)] fill-[hsl(131,8%,95%)] bg-[hsl(131,50%,20%)] cursor-pointer duration-300`} onClick={() => setIsClicked(!isClicked)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 rotate-45" viewBox="0 0 24 24">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.411 7H16v.031A5.037 5.037 0 0 0 14.969 8H15V4.589A8.039 8.039 0 0 1 19.411 9zM12 15c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm1-10.931v3.032a4.988 4.988 0 0 0-2 0V4.069c.328-.041.66-.069 1-.069s.672.028 1 .069zm-4 .52V8h.031A5.037 5.037 0 0 0 8 9.031V9H4.589C5.402 7 6.999 5.402 9 4.589zM4.069 11h3.032a4.995 4.995 0 0 0 .001 2H4.069C4.028 12.672 4 12.339 4 12s.028-.672.069-1zm.52 4H8v-.031c.284.381.621.718 1 1.005v3.437A8.039 8.039 0 0 1 4.589 15zM11 19.931v-3.032a4.988 4.988 0 0 0 2 0v3.032c-.328.041-.66.069-1 .069s-.672-.028-1-.069zm4-.52v-3.437a5.038 5.038 0 0 0 1-1.005V15h3.411A8.039 8.039 0 0 1 15 19.411zM19.931 13h-3.032a4.995 4.995 0 0 0-.001-2h3.032c.042.328.07.661.07 1s-.028.672-.069 1z" />
        </svg>
        <p>Help & Support</p>
      </div>

      {/* after-clicked */}
      <div className={`${!isClicked ? 'translate-x-full' : 'translate-x-0 delay-300'} flex flex-col justify-center items-center fixed bottom-20 lg:bottom-[20%] right-0 max-w-[200px] py-6 px-4 rounded-l-[16px] text-center text-[hsl(131,50%,20%)] bg-[hsl(131,8%,95%)] duration-300`}>
        <button className="absolute top-0 left-0 p-2 text-xs" onClick={() => setIsClicked(!isClicked)}>&#10006;</button>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z" />
          <path d="M7 7h10v2H7zm0 4h7v2H7z" />
        </svg>
        <p className="leading-5 tracking-tight font-semibold">For more informations</p>
        <a href="mailto:ganimalqudhaifi@gmail.com" className="px-4 py-1.5 mt-4 rounded-md bg-[hsl(131,60%,32%)] hover:bg-[hsl(131,60%,28%)] text-[hsl(131,8%,95%)] duration-200">Contact Us</a>
      </div>
    </>
  );
}
