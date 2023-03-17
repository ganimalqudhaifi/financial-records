import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AppLayout } from '../../../components';
import checkUID from '../../../utils/checkUID';

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    // login check
    const uid = checkUID();
    uid !== null ? setIsLogin(true) : router.push('/login');
    isLogin && setUser(JSON.parse(localStorage.getItem('user')));
  }, [router, isLogin]);

  if (isLogin) {
    return (
      <>
        <Head>
          <title>Financial Records - App Profile</title>
        </Head>

        <AppLayout user={user}>
          <div className="w-full p-4 lg:ml-64">
            <h2 className="font-medium text-3xl mb-4">Profile</h2>
            <div>
              - TODO!: add feature for edit profile picture / avatar
              <br />
              - TODO!: add feature for edit username
              <br />
              - TODO!: add feature for change password - it would be verified email to unlock this feature
              <br />
              - TODO!: add feature add link to social media - it will be direct link with icon on sidebar
            </div>
          </div>
        </AppLayout>
      </>
    );
  }
}
