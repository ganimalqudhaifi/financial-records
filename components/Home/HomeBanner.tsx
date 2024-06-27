import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomeBanner() {
  return (
    <div className="grid w-full max-w-5xl px-6 my-8 sm:grid-cols-2 sm:my-20 md:px-12 lg:min-h-[82vh] lg:my-0">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="my-auto"
      >
        <h1 className="text-[52px] leading-none text-main-color font-bold sm:text-[54px] md:text-[56px] lg:text-5xl">
          Financial Records.
        </h1>
        <p className="text-md mt-1">
          {"Track your financial flow with "}
          <br className="hidden sm:inline lg:hidden" />
          financial records
        </p>
        <Link
          className="inline-block px-4 py-2 mt-6 rounded-md text-lg bg-main-color text-bg-color font-semibold duration-200 hover:scale-105 active:scale-100"
          href="/demo"
        >
          Try Demo
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="grid place-items-center"
      >
        <Image
          src="/hero_image.svg"
          alt="vector"
          width={400}
          height={0}
          priority
        />
      </motion.div>
    </div>
  );
}
