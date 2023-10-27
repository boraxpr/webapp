import { Open_Sans } from 'next/font/google'
import './globals.css'

const open_Sans = Open_Sans({
  weight: ['400', '700'],
  subsets: ['latin']
})
export const metadata = {
  title: 'Web App',
  description: 'Login and API calling',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href='/icon'
        sizes='any'
      />
      <body className={open_Sans.className}>
        {children}
      </body>
    </html>
  );
}