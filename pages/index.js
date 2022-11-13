import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/demo');
  });
  // return (
  //   <>
  //   <Head>
  //     <title>Financial Records - Home</title>
  //   </Head>
  //   </>
  // )
}
