import Link from 'next/link';
import { BiSolidWallet } from 'react-icons/bi';

export default function Logo() {
  return (
    <Link href="/" className="flex flex-auto justify-self-start items-center">
      <BiSolidWallet className="fill-main-color w-8 h-8" />
      <div className="ml-2">
        <div className="text-lg font-bold">Financial</div>
        <div className="text-xs leading-7 font-semibold -mt-[10px]">Records</div>
      </div>
    </Link>
  );
}
