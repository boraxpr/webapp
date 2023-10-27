import React from 'react';
import Signup from '@/components/signupForm/Signup';
import { SnackbarProvider } from '@/components/context/SnackBarContext';
export const metadata = {
  title: 'Sign Up - Web App',
}
export default function SignupPage() {
  return (
    <SnackbarProvider>
      <main>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Signup />
        </div>
      </main>
    </SnackbarProvider>
  );
}
