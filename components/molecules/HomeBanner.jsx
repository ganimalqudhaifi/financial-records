import Image from 'next/image';
import Link from 'next/link';

export default function HomeBanner() {
  return (
    <div className="w-full max-w-5xl px-6 md:px-12 my-auto grid sm:grid-cols-2">
      <div className="my-auto">
        <h1 className="text-5xl text-main-color font-bold">Financial Records.</h1>
        <p className="text-md mt-1">Track your financial flow with financial records</p>
        <Link className="inline-block px-4 py-2 mt-6 rounded-md text-lg bg-main-color text-bg-color font-semibold hover:scale-105 duration-200 active:scale-100" href="/demo">Try Demo</Link>
      </div>
      <div className="hidden sm:grid place-items-center">
        <Image src="/vector1.svg" alt="vector" width={400} height={0} />
      </div>
    </div>
  );
}
