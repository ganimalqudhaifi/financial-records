import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex flex-auto justify-self-start">
      <svg className="fill-main-color w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zm-2 9h-2v-4h2v4zM5 7a1.001 1.001 0 0 1 0-2h13v2H5z" /></svg>
      {/* <div className="flex flex-col items-start ml-2.5 font-semibold text-center"> */}
      <div className="ml-2">
        <div className="text-lg font-bold">Financial</div>
        <div className="text-xs leading-7 font-semibold -mt-[10px]">Records</div>
      </div>
    </Link>
  );
}
