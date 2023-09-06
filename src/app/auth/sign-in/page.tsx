'use client';

import { Button } from '@/components/general/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CredentialData {
  email: string;
  password: string;
}

export default function SignInPage() {
  const router = useRouter();
  const [data, setData] = useState<CredentialData>({ email: '', password: '' });
  const [error, setError] = useState<string>();

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await signIn('credentials', {
      ...data,
      redirect: false
    });
    if (!response?.error) {
      router.refresh();
      router.push('/');
    } else {
      setError(response.error);
      resetForm();
    }
  };

  const resetForm = () => {
    setData({ email: '', password: '' });
  };

  // https://tailwindui.com/components/application-ui/forms/sign-in-forms
  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {error && <p className="text-red-600">{error}</p>}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={loginUser}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={data.email}
                onChange={e => {
                  setData({ ...data, email: e.target.value });
                }}
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={data.password}
                onChange={e => {
                  setData({ ...data, password: e.target.value });
                }}
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
