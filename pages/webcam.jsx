import Head from 'next/head';
import dynamic from 'next/dynamic';
import LocalMediaProvider from '@/providers/LocalMediaContext';
import BroadcastProvider from '@/providers/BroadcastContext';
import UserSettingsProvider from '@/providers/UserSettingsContext';
import ModalProvider from '@/providers/ModalContext';
import BroadcastLayoutProvider from '@/providers/BroadcastLayoutContext';
import BroadcastMixerProvider from '@/providers/BroadcastMixerContext';

const BroadcastApp = dynamic(() => import('@/components/BroadcastApp'), {
  ssr: false,
});

export default function Webcam() {
  const title = `Amazon IVS – Web Broadcast Tool`;
  return (
    <>
      <Head>
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
      </ModalProvider>
      <div>
        <nav className="bg-gray-800 text-white">
          <div className="container mx-auto px-4 flex justify-between items-center h-16">
            <a href="#" className="text-xl font-bold">RemoteHealth</a>
            <div className="hidden md:flex space-x-6">
              <a href="" className="hover:text-gray-400">Home</a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}