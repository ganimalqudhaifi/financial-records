import Image from "next/image";
import Link from "next/link";

export default function HomeFooter() {
  return (
    (<footer className="max-w-6xl mx-auto flex flex-col justify-between px-4 pb-6 sm:px-14 md:flex-row">
      <div className="flex flex-col space-y-2.5 md:flex-row md:space-x-3 md:space-y-0">
        <div className="flex items-center justify-center text-gray-400 text-xs font-semibold tracking-wider uppercase">
          Powered by
        </div>
        <div className="flex items-center justify-center space-x-1">
          <Link href="https://nextjs.org" target="_blank" legacyBehavior>
            <div className="w-7 h-7 bg-gray-300 flex items-center justify-center rounded-full hover:-translate-y-0.5 hover:duration-500">
              <Image
                alt="nextjs logo"
                width={24}
                height={24}
                src="/icons/nextjslogo.png"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </div>
          </Link>
          <Link href="https://tailwindcss.com" target="_blank" legacyBehavior>
            <div className="w-7 h-7 bg-transparent flex items-center justify-center rounded-full hover:-translate-y-0.5 hover:duration-500">
              <Image
                alt="tailwind logo"
                width={24}
                height={24}
                src="/icons/tailwindlogo.png"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </div>
          </Link>
          <Link href="https://firebase.google.com" target="_blank" legacyBehavior>
            <div className="w-7 h-7 bg-transparent flex items-center justify-center rounded-full hover:-translate-y-0.5 hover:duration-500">
              <Image
                alt="firebase logo"
                width={24}
                height={24}
                src="/icons/firebaselogo.png"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </div>
          </Link>
        </div>
      </div>
      <div className="inline-flex justify-center gap-2 py-6 text-sm text-center text-gray-300 whitespace-nowrap md:order-first">
        <p className="text-gray-400 text-xs font-semibold uppercase leading-5 tracking-wide">
          &copy;2023 A project by
        </p>
        <div>
          <a
            href="https://ganimalqudhaifi.my.id"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-gray-300 text-xs font-bold uppercase leading-5 tracking-wider">
              Ganim Alqudhaifi
            </p>
          </a>
        </div>
      </div>
    </footer>)
  );
}
