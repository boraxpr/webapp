'use client'
import React from 'react';
import Head from 'next/head';
import Signup from '@/components/Signup'; // Import your Signup component

export default function SignupPage() {
  return (
    <div>
      <Head>
        <title>Sign Up - Web App</title>
        <meta name="description" content="Sign up for your account" />
      </Head>
      <main>
        <Signup />
      </main>
    </div>
  );
}
