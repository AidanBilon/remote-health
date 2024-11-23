import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import LocalMediaProvider from '@/providers/LocalMediaContext';
import BroadcastProvider from '@/providers/BroadcastContext';
import UserSettingsProvider from '@/providers/UserSettingsContext';
import ModalProvider from '@/providers/ModalContext';
import BroadcastLayoutProvider from '@/providers/BroadcastLayoutContext';
import BroadcastMixerProvider from '@/providers/BroadcastMixerContext';

const BroadcastApp = dynamic(() => import('@/components/BroadcastApp'), {
  ssr: false,
});

export default function Broadcast() {
  const title = `Amazon IVS – Web Broadcast Tool`;
  return (
    <>
      {/* <Head>
        <title>{title}</title>
        <meta
          name='description'
          content='This tool can be used to stream your webcam or share your screen to an Amazon IVS Channel.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
        <ModalProvider>
        <UserSettingsProvider>
          <LocalMediaProvider>
            <BroadcastProvider>
              <BroadcastMixerProvider>
                <BroadcastLayoutProvider>
                  <BroadcastApp />
                </BroadcastLayoutProvider>
              </BroadcastMixerProvider>
            </BroadcastProvider>
          </LocalMediaProvider>
        </UserSettingsProvider>
      </ModalProvider> */}
      <div>
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">

          <a href="#" className="text-xl font-bold">RemoteHealth</a>


          <div className="hidden md:flex space-x-6">
            <a href="" className="hover:text-gray-400">Home</a>
            <a href="" className="hover:text-gray-400">About</a>
            <a href="" className="hover:text-gray-400">Services</a>
            <a href="" className="hover:text-gray-400">Contact</a>
          </div>




        </div>
      </nav>

    </div>

      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <Link href="/dashboard">Login</Link>



          </form>


          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account!{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
