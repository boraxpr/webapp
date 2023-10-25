import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Typography } from '@mui/material';
import LogoutButton from '@/components/logout/page';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'web app',
  description: 'Login and API calling',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className='flex justify-center mt-5 mb-5'>
          <Typography variant="h2" gutterBottom color="#b2daed">
            <Link href="/">
              Rick and Morty Characters
            </Link>
          </Typography>
          <LogoutButton />

        </nav>
        {children}
      </body>
    </html>
  );
}