import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/landing');
  }, [router]);

  return (
    <>
      <Head>
        <title>Remote Health</title>
        <link rel="icon" href="/blacklogo.png" />
      </Head>
      <div>Redirecting...</div>
    </>
  );
}