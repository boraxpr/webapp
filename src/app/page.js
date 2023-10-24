'use client'
import CharacterList from '@/components/CharacterList/CharacterList';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'; // Optional for development

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <CharacterList />
      </main>
      <ReactQueryDevtools /> {/* Optional for development */}
    </QueryClientProvider>
  );
}
