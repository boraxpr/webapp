'use client'
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { auth } from "@/components/firebase";

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push('/'); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <form onSubmit={handleForm} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
