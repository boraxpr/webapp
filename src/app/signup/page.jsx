import React from 'react';
import Signup from '@/components/signupForm/Signup';
import Head from 'next/head';
import { SnackbarProvider } from '@/components/context/SnackBarContext';
export default function SignupPage() {
  return (
    <SnackbarProvider>
      <main>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Head>
            <title>Sign Up - Web App</title>
            <meta name="description" content="Sign up for your account" />
          </Head>
          <Signup />
        </div>
      </main>
    </SnackbarProvider>
  );
}
