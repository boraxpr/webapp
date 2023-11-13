'use client'
import CharacterList from "@/components/CharacterList/CharacterList";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AuthLoadingUI } from "@/components/Loading/authLoading";
const Home = () => {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <AuthLoadingUI />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-60 lg:pt-0 md:pt-0 md:p-5">
      <CharacterList />
    </main>
  );
}
export default Home;