'use client'
import React, { useCallback, useState } from 'react';
import { TextField, Typography, Snackbar, Alert } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/components/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '../context/SnackBarContext';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const openSnackbar = useSnackbar();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'password' || name === 'confirmPassword') {
      const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
      setIsSubmitDisabled(!passwordValid || value !== e.target.form[name === 'password' ? 'confirmPassword' : 'password'].value);
      setPasswordError(!passwordValid);
      setConfirmPasswordError(e.target.form.password.value !== e.target.form.confirmPassword.value);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      router.replace('/login');
    } catch (error) {
      e.preventDefault();
      const errorCode = error.code;
      let errorMessage = error.message;
      // Map error codes to user friendly messages
      if (errorCode === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use'
      }
      openSnackbar(errorMessage);
    }
  }, [formData, router, openSnackbar]);



  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <Typography variant="h5" align="center" gutterBottom>
        Signup
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
          name="firstName"
          type="text"
          id="firstName"
          label="First Name"
          variant="outlined"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          name="lastName"
          type="text"
          id="lastName"
          label="Last Name"
          variant="outlined"
          fullWidth
          value={formData.lastName}
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
          error={passwordError}
          helperText={passwordError ? 'must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' : ''}
        />
        <TextField
          name="confirmPassword"
          type="password"
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          error={confirmPasswordError}
          helperText={confirmPasswordError ? "Password do not match." : ""}
        />
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitDisabled}
        >
          Sign Up
        </button>
      </form>
      <div className="mt-5 text-center">
        <Link href="/login">
          <Typography color="indigo-600" sx={{ textDecoration: "underline" }}>
            Log In
          </Typography>
        </Link>
      </div>
    </div>
  );
}
