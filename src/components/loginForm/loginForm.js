'use client'
import React, { useCallback, useState } from 'react';
import { TextField, Typography, Snackbar, Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/components/firebase';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '../../context/SnackBarContext';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const openSnackbar = useSnackbar();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);


  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      router.replace('/');
    } catch (error) {
      const errorCode = error.code;
      let errorMessage = error.message;
      // Map error codes to user-friendly messages
      if (errorCode === 'auth/wrong-password') {
        errorMessage = 'The password is invalid.';
      } else if (errorCode === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (errorCode === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      } else if (errorCode === 'auth/user-disabled') {
        errorMessage = 'The user corresponding to the given email has been disabled.';
      }
      openSnackbar(errorMessage, 'error');
    }
  }, [formData, router, openSnackbar]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">

        <Typography variant="h5" align="center" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            name="email"
            type="email"
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none"
          >
            Log In
          </button>
        </form>
        <div className="mt-5 text-center">
          <Link href="/signup">
            <Typography color="indigo-600" sx={{ textDecoration: "underline" }}>
              Sign Up
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}
