import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomeBanner() {
  return (
    <div className=" grid sm:grid-cols-2 w-full max-w-5xl lg:min-h-[82vh] px-6 md:px-12 my-8 sm:my-20 lg:my-0">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="my-auto"
      >
        <h1 className="text-[52px] sm:text-[54px] md:text-[56px] leading-none lg:text-5xl text-main-color font-bold">Financial Records.</h1>
        <p className="text-md mt-1">
          {'Track your financial flow with '}
          <br className="hidden sm:inline lg:hidden" />
          financial records
        </p>
        <Link className="inline-block px-4 py-2 mt-6 rounded-md text-lg bg-main-color text-bg-color font-semibold hover:scale-105 duration-200 active:scale-100" href="/demo">Try Demo</Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="grid place-items-center"
      >
        <Image src="/hero_image.svg" alt="vector" width={400} height={0} priority />
      </motion.div>
    </div>
  );
}
