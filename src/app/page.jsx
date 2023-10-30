import { AuthContextProvider } from '@/context/AuthContext';
import Home from './home/page';

export const metadata = {
  title: 'Home - Web App',
}

export default function App() {
  return (

    <AuthContextProvider>
      <Home />
    </AuthContextProvider>
  );
}
