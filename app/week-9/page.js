"use client";

// Import necessary modules and hooks
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../../contexts/AuthContext";

 
export default function Page() {
  const router = useRouter();
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  
    useEffect(() => {
    if (user) {
      router.push("/week-9/shopping-list");
    }
  }, [user, router]);

    return (
    <main className="flex flex-col items-center justify-center min-h-screen p-60 gap-6">
      <h1 className="text-4xl font-bold mb-8">Welcome to the App!</h1>

      {/* If no user, show login button */}
      {!user ? (
        <button
          type="button"
          onClick={() => gitHubSignIn && gitHubSignIn()}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In with GitHub
        </button>
      ) : (
        // If user is logged in, show welcome message and sign out button
        <div>
          <p className="mb-4 text-4xl font-bold">
            Welcome, <strong>{user.displayName ?? user.email ?? "User"}</strong> thanks for signing in!
          </p>
        </div>
      )} 
    </main>
  );
}

