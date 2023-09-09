import Image from 'next/image';
import Link from 'next/link';

export default function HomeFooter() {
  return (
    <footer className="flex flex-col md:flex-row justify-between px-4">
      <div className="flex flex-col md:flex-row space-y-2.5 md:space-x-3 md:space-y-0">
        <div className="flex items-center justify-center text-gray-300">Powered by</div>
        <div className="flex items-center justify-center space-x-0.5">
          <Link href="https://nextjs.org" target="_blank"><div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full hover:-translate-y-0.5 hover:duration-500"><Image alt="nextjs logo" width={28} height={28} src="/icons/nextjslogo.png" /></div></Link>
          <Link href="https://tailwindcss.com" target="_blank"><div className="w-8 h-8 bg-transparent flex items-center justify-center rounded-full hover:-translate-y-0.5 hover:duration-500"><Image alt="tailwind logo" width={28} height={28} src="/icons/tailwindlogo.png" /></div></Link>
          <Link href="https://firebase.google.com" target="_blank"><div className="w-8 h-8 bg-transparent flex items-center justify-center rounded-full hover:-translate-y-0.5 hover:duration-500"><Image alt="firebase logo" width={28} height={28} src="/icons/firebaselogo.png" /></div></Link>
        </div>
      </div>
      <div className="md:order-first py-6 text-sm text-center text-gray-300 whitespace-nowrap">&copy;2023 All rights reserved.</div>
    </footer>
  );
}
