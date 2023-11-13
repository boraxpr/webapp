'use client'
import React from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Sign out the user using Firebase
    signOut(auth) // Make sure to pass the Firebase auth instance (user.auth) here
      .then(() => {
        // Handle successful sign-out (e.g., navigate to the login page)
        // You can use router.push or any other navigation method you prefer
        router.replace('/login');
      })
      .catch((error) => {
        // Handle any errors that occur during sign-out
        console.error('Error signing out:', error);
      });
  };

  return (
    <Button variant="outlined" onClick={handleLogout} >
      Logout
    </Button>
  );
}

export default LogoutButton;