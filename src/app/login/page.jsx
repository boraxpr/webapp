import React from "react";
import LoginForm from "@/components/loginForm/loginForm";
import { SnackbarProvider } from "@/context/SnackBarContext";
export const metadata = {
  title: 'Log In - Web App',
}
export default function Page() {
  return (
    <SnackbarProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoginForm />
      </div>
    </SnackbarProvider>
  );
}