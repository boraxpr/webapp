'use client'
import Link from 'next/navigation';
import Typography from '@mui/material/Typography';
import LogoutButton from '@/components/logout/logout';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';

function NavBar() {
  const { user } = useAuthContext();
  const router = useRouter();
  // Check if the current page is the login page
  const isLoginPage = router.pathname === '/login';
  return (
    <nav className="flex justify-center mt-5 mb-5">
      <Typography variant="h2" gutterBottom color="#b2daed">
        {isLoginPage ? (
          <div> <Link href="/">
            Rick and Morty Characters
          </Link>
          </div>

        ) : null}
      </Typography>

    </nav>
  );
}

export default NavBar;
