import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let uid = localStorage.getItem('uid');
    if (uid === null) {
      uid = sessionStorage.getItem('uid');
      (uid === null) ? setIsLogin(false) : setIsLogin(true);
    } else {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Financial Records - Home</title>
      </Head>

      <div className="flex flex-col px-4 sm:px-[5%] md:px-[6%] lg:px-[8%] w-full min-h-[100vh] bg-bg-color text-text-color">
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
            (isLogin === false)
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
                <Link className="flex justify-center items-center px-3.5 md:px-5 py-2 md:py-2.5 mr-3 text-bg-color bg-main-color hover:outline outline-offset-2 outline-1 outline-main-color rounded-full" href="/app">
                  <span className="mr-1 font-semibold tracking-wide">Go to app</span>
                  <div className="flex justify-center items-center text-2xl font-bold">
                    <ion-icon name="log-in-outline" />
                  </div>
                </Link>
              )
            }
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className="p-2 flex items-center justify-center cursor-pointer lg:hidden"
            >
              <span className={`relative w-5 h-6 flex items-center justify-center before:content-[''] before:absolute before:w-full before:h-0.5 before:bg-white before:duration-500 ${!isActive ? 'before:translate-y-[-4px]' : 'before:translate-y-0 before:rotate-[225deg]'} after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:duration-500 ${!isActive ? 'after:translate-y-[4px]' : 'after:translate-y-0 after:rotate-[-225deg]'}`} />
            </button>
          </div>

          <nav className="lg:order-1 w-full lg:w-auto h-0 lg:h-auto">
            <ul className="w-full mt-4 lg:mt-0 rounded-lg overflow-hidden lg:flex ">
              <li className={`${!isActive ? 'opacity-0 invisible' : 'opacity-100 visible'} duration-500 lg:opacity-100 lg:visible last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]`}><Link href="#" className="block px-5 py-[10px] text-gray-300 font-medium bg-gray-600 duration-200 hover:bg-gray-700 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]">Home</Link></li>
              <li className={`${!isActive ? 'opacity-0 invisible' : 'opacity-100 visible'} duration-500 lg:opacity-100 lg:visible last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]`}><Link href="#" className="block px-5 py-[10px] text-gray-300 font-medium bg-gray-600 duration-200 hover:bg-gray-700 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]">About</Link></li>
              <li className={`${!isActive ? 'opacity-0 invisible' : 'opacity-100 visible'} duration-500 lg:opacity-100 lg:visible last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]`}><Link href="#" className="block px-5 py-[10px] text-gray-300 font-medium bg-gray-600 duration-200 hover:bg-gray-700 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]">Contact</Link></li>
              <li className={`${!isActive ? 'opacity-0 invisible' : 'opacity-100 visible'} duration-500 lg:opacity-100 lg:visible last:lg:hidden last:border-t-2 last:border-gray-500 active:brightness-200 active:duration-[0ms]`}><Link href="/register" className="block px-5 py-[10px] text-gray-300 font-medium bg-gray-600 duration-200 hover:bg-gray-700 hover:duration-[0ms] hover:text-main-color lg:bg-transparent lg:px-6 lg:hover:bg-transparent lg:duration-[0ms]">Register</Link></li>
            </ul>
          </nav>
        </header>

        <main className="mt-10 flex-1">
          <article className="px-6 md:px-12 grid sm:grid-cols-2">
            <section className="my-auto">
              <h1 className="text-5xl text-main-color font-bold">Financial Records.</h1>
              <p className="text-md mt-1">Track your financial flow with financial records</p>
              <Link className="inline-block px-4 py-2 mt-6 rounded-md text-lg bg-main-color text-bg-color font-semibold hover:scale-105 duration-200 active:scale-100" href="/demo">Try Demo</Link>
            </section>
            <section className="hidden sm:grid place-items-center">
              <svg className="p-3 align-center rounded-md w-[300px] md:w-[350px] lg:w-[400px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 641.51274 626.39159" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g>
                  <path d="M198.10146,459.50579H117.74436c-2.02587,0-3.67427-1.64844-3.67427-3.67429s1.64841-3.67352,3.67427-3.67352h80.35711c2.02586,0,3.67351,1.64764,3.67351,3.67352s-1.64764,3.67429-3.67351,3.67429h-.00002Z" fill="#29fd53" />
                  <path d="M54.5875,479.17299c0,.66003,.53003,1.19,1.19006,1.19h204.29c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19H55.77756c-.66003,0-1.19006,.53003-1.19006,1.19Z" fill="#fff" />
                </g>
                <circle className="stroke-amber-300 stroke-1" cx="485.60718" cy="174.40329" r="65" fill="#29fd53" />
                <path d="M0,561.30846c0,.66003,.53003,1.19,1.19006,1.19H523.48004c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19H1.19006c-.66003,0-1.19006,.53003-1.19006,1.19Z" fill="#fff" />
                <g>
                  <path d="M7.55489,480.94674l-1.67075-1.83057,163.0638-148.79639,58.74879,26.33618,63.44026-108.79395,52.12207-25.12366,48.29266,80.48737c26.07251-67.49872,91.45966-138.11798,169.81033-209.76619l1.92743,1.56058c-73.48529,70.35442-136.3587,141.02824-172.04047,212.52049l-44.66876-74.66707c-2.11026-3.52744-6.5448-4.88992-10.27161-3.15582l-.00006,.00003c-28.49045,13.25661-52.25458,34.89546-68.11469,62.02293l-39.7393,67.97107-9.0714-4.06644c-30.33815-13.5997-65.85408-7.89978-90.41309,14.51025L7.55489,480.94674Z" fill="#fff" />
                  <polygon points="565.03815 107.00612 562.5625 107.17803 558.56775 98.52049 549.62372 96.70378 549.27637 94.24652 564.01953 92.15139 565.03815 107.00612" fill="#fff" />
                </g>
                <polygon points="310.6843 159.98014 319.44968 126.28289 353.59686 124.64036 363.8132 171.09089 310.6843 159.98014" fill="#ffb6b6" />
                <polygon points="310.6843 159.98014 319.44968 126.28289 353.59686 124.64036 363.8132 171.09089 310.6843 159.98014" opacity=".1" />
                <circle cx="333.15384" cy="103.92448" r="41.21628" fill="#ffb6b6" />
                <path d="M355.89438,112.64867h-.00006s-15.65744-31.02253-34.00266-29.23145c-18.34528,1.79106-28.00998,3.96931-28.00998,3.96931,0,0-5.44562-24.16184,20.1925-33.45562,0,0-32.59821-32.13389,6.21277-47.89698,38.811-15.7631,60.52856,4.34073,60.52856,4.34073,0,0,28.72815,28.67943-7.45398,50.11471,0,0,26.86676,36.13874-5.66187,65.92528,0,0,7.2756-24.1039-.31577-19.65871-7.5914,4.44517-11.4895,5.89272-11.4895,5.89272v.00002l-.00003-.00002Z" fill="#2f2e41" />
                <polygon points="287.67856 330.41161 282.19592 335.66613 242.58878 420.59115 238.25323 561.0631 304.79889 561.0631 336.01489 491.49968 357.04745 560.39159 416.88153 560.39159 430.75189 435.33205 393.46613 346.88671 287.67856 330.41161" fill="#2f2e41" />
                <path d="M356.61389,156.55581h-44.44116l-48.33972,26.01334,11.27243,50.29243s-2.60132,30.34889,3.46844,52.89375c6.06979,22.54489,3.46844,52.02667,3.46844,52.02667l111.42377,9.10468,3.46844-102.31909-1.73422-68.50177-38.58643-19.50999h0v-.00002Z" fill="#e6e6e6" />
                <path d="M271.20346,183.00271s-26.88043,.86711-31.216,18.20934-7.80399,106.65465-7.80399,106.65465c0,0,2.60132,52.99619,31.64954,27.79877,29.04822-25.19742,26.4469-101.5032,26.4469-101.5032l-19.07645-51.15955v0Z" fill="#e6e6e6" />
                <path d="M531.92712,625.39159h-158.40878c-5.36478,0-9.72961-4.36426-9.72961-9.72961v-163.75797c0-5.36533,4.36484-9.72961,9.72961-9.72961h158.40878c5.36536,0,9.72961,4.36429,9.72961,9.72961v163.75797c0,5.36536-4.36426,9.72961-9.72961,9.72961Z" fill="#222327" />
                <path d="M531.92712,626.39159h-158.40918c-5.91602,0-10.72949-4.81299-10.72949-10.72949v-163.7583c0-5.91602,4.81348-10.72949,10.72949-10.72949h158.40918c5.91602,0,10.72949,4.81348,10.72949,10.72949v163.7583c0,5.9165-4.81348,10.72949-10.72949,10.72949Zm-158.40918-183.21729c-4.81348,0-8.72949,3.91602-8.72949,8.72949v163.7583c0,4.81348,3.91602,8.72949,8.72949,8.72949h158.40918c4.81348,0,8.72949-3.91602,8.72949-8.72949v-163.7583c0-4.81348-3.91602-8.72949-8.72949-8.72949h-158.40918Z" fill="#fff" />
                <g>
                  <path d="M458.974,582.37066h-13.05609c-1.58966,0-2.88275-.99817-2.88275-2.22522v-56.21143c0-1.22705,1.29309-2.22522,2.88275-2.22522h13.05609c1.58966,0,2.88275,.99817,2.88275,2.22522v56.21143c0,1.22705-1.29309,2.22522-2.88275,2.22522Z" fill="#29fd53" />
                  <path d="M415.80945,549.24474c-1.28421,0-2.32919,.80664-2.32919,1.79791v29.04004c0,.99127,1.04498,1.79791,2.32919,1.79791h13.05612c1.28421,0,2.32919-.80664,2.32919-1.79791v-29.04004c0-.99127-1.04498-1.79791-2.32919-1.79791h-13.05612Z" fill="#29fd53" />
                  <path d="M489.0824,582.37066h-13.05609c-1.58966,0-2.88275-.99817-2.88275-2.22522v-92.12048c0-1.22705,1.29309-2.22519,2.88275-2.22519h13.05609c1.58966,0,2.88275,.99817,2.88275,2.22519v92.12048c0,1.22705-1.29309,2.22522-2.88275,2.22522Z" fill="#29fd53" />
                </g>
                <g>
                  <path d="M208.12485,178.57206h-14.91385c-1.81583,0-3.29295-1.14018-3.29295-2.54182V111.8206c0-1.40163,1.47713-2.54182,3.29295-2.54182h14.91385c1.81583,0,3.29295,1.14018,3.29295,2.54182v64.20965c0,1.40163-1.47713,2.54182-3.29295,2.54182v-.00002Z" fill="#29fd53" />
                  <path d="M158.81854,140.73272c-1.46693,0-2.66061,.92139-2.66061,2.05371v33.17207c0,1.13232,1.19368,2.05371,2.66061,2.05371h14.91385c1.46693,0,2.66061-.92139,2.66061-2.05371v-33.17207c0-1.13232-1.19368-2.05371-2.66061-2.05371h-14.91385Z" fill="#29fd53" />
                  <path d="M242.5173,178.57206h-14.91385c-1.81583,0-3.29295-1.14018-3.29295-2.54182V70.80214c0-1.40163,1.47713-2.54182,3.29295-2.54182h14.91385c1.81583,0,3.29294,1.14018,3.29294,2.54182v105.22811c0,1.40163-1.47711,2.54182-3.29294,2.54182v-.00002Z" fill="#29fd53" />
                </g>
                <path d="M428.4375,466.00084c7.72461-.73965,13.04395-11.17798,11.88171-23.3201-.39771-4.85672-1.95276-9.54749-4.53497-13.67993l-1.48889-13.74216,.22809-.06839,3.74231-65.15799c.87012-15.15002-5.12701-30.0369-16.68127-39.8746-6.87335-5.85223-14.20575-8.81528-18.92081-1.42099-7.82382,12.26947,2.31027,62.84671,8.96533,91.60162l2.58023,30.72778c-1.75278,4.54852-2.3905,9.45065-1.85977,14.29608,1.16016,12.13803,8.36346,21.37817,16.08804,20.63867Z" fill="#ffb6b6" />
                <path d="M385.66211,177.80004s22.54489-8.67111,32.95023,17.34222,21.67776,154.34576,21.67776,154.34576l-52.89377-9.53821-1.73422-162.14977v-.00002Z" fill="#e6e6e6" />
                <g>
                  <path d="M76.09184,165.07636h-30.3571c-2.02587,0-3.67427-1.64844-3.67427-3.67429s1.64841-3.67352,3.67427-3.67352h30.3571c2.02586,0,3.67351,1.64764,3.67351,3.67352s-1.64764,3.67429-3.67351,3.67429Z" fill="#e6e6e6" />
                  <path d="M76.09184,112.99718h-30.3571c-2.02587,0-3.67427-1.64844-3.67427-3.67429s1.64841-3.67352,3.67427-3.67352h30.3571c2.02586,0,3.67351,1.64764,3.67351,3.67352s-1.64764,3.67429-3.67351,3.67429Z" fill="#e6e6e6" />
                  <path d="M76.09184,75.44008h-30.3571c-2.02587,0-3.67427-1.64844-3.67427-3.67429s1.64841-3.67352,3.67427-3.67352h30.3571c2.02586,0,3.67351,1.64764,3.67351,3.67352s-1.64764,3.67429-3.67351,3.67429Z" fill="#e6e6e6" />
                  <path d="M40.84269,178.75373c0,.66003,.53003,1.19,1.19006,1.19H246.32274c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19H42.03275c-.66003,0-1.19006,.53003-1.19006,1.19Z" fill="#fff" />
                </g>
                <path d="M434.84269,486.75373c0,.66003,.53003,1.19,1.19006,1.19h204.28999c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19h-204.28999c-.66003,0-1.19006,.53003-1.19006,1.19Z" fill="#fff" />
                <path d="M374.84269,583.75373c0,.66003,.53003,1.19,1.19006,1.19h204.28999c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19h-204.28999c-.66003,0-1.19006,.53003-1.19006,1.19Z" fill="#fff" />
                <path d="M237.46713,172.73761c-7.72461,.73964-13.04395,11.17796-11.88174,23.32008,.39774,4.85674,1.95276,9.54749,4.53497,13.67993l1.48889,13.74216-.22806,.06839-3.74228,65.15799c-.87012,15.15002,5.12704,30.0369,16.68127,39.8746,6.87335,5.85223,14.20575,8.81528,18.92081,1.42099,7.82382-12.26947-2.31027-62.84671-8.96533-91.60161l-2.58023-30.72778c1.75278-4.54852,2.3905-9.45065,1.85977-14.2961-1.16016-12.13803-8.36346-21.37819-16.08804-20.63866h-.00003v0Z" fill="#ffb6b6" />
              </svg>
            </section>
          </article>
        </main>

        <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
        <Script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
      </div>
    </>
  );
}
