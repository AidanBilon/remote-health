import Head from 'next/head';
import Link from 'next/link';

export default function Landing() {
  return (
    <>
      <Head>
        <title>Remote Health - Login</title>
        <meta name="description" content="Login to access the dashboard page." />
        <link rel="icon" href="/blacklogo.png" />
      </Head>
      <div>
        <nav className="bg-purple-500 text-white">
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
            <Link href="/dashboard" legacyBehavior>
              <a className="block w-full text-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700">
                Login
              </a>
            </Link>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <a href="#" className="text-purple-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}