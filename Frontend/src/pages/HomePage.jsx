import { SignInButton, SignUpButton } from "@clerk/react";
import { Link } from "react-router";
import { SparklesIcon } from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <header className="border-b border-primary/20 bg-base-100/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <SparklesIcon className="size-6 text-white" />
            </div>
            <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono">
              Talent IQ
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <SignInButton mode="modal">
              <button type="button" className="btn btn-ghost btn-sm">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button type="button" className="btn btn-primary btn-sm">
                Sign up
              </button>
            </SignUpButton>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold max-w-2xl text-base-content">
          Practice technical interviews with live collaboration
        </h1>
        <p className="mt-4 text-base-content/70 max-w-lg">
          Sign in to create sessions, join rooms, and work through problems together.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <SignUpButton mode="modal">
            <button type="button" className="btn btn-primary">
              Get started
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button type="button" className="btn btn-outline btn-primary">
              I already have an account
            </button>
          </SignInButton>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
