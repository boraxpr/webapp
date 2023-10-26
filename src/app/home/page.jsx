'use client'
import CharacterList from "@/components/CharacterList/CharacterList";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/context/AuthContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    // You can display a loading spinner or message here
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-60 lg:pt-0 md:pt-0 md:p-5">
      <CharacterList />
    </main>
  );
}
