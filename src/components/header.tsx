import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Header = () => {
  return (
    <nav className="ml-4 flex flex-wrap items-center">
      <div>
        <Link href="/" className="text-3xl">
          Wordle Tracker
        </Link>
      </div>
      <div className="ml-10 mt-1.5 flex flex-row items-center space-x-4">
        <Link
          href="/"
          className="text-1xl rounded px-4 py-4 hover:bg-slate-800"
        >
          Home
        </Link>
        <Link
          href="/upload"
          className="text-1xl rounded px-4 py-4 hover:bg-slate-800"
        >
          Upload
        </Link>
        <Link
          href="/userscore"
          className="text-1xl rounded px-4 py-4 hover:bg-slate-800"
        >
          Your Scores
        </Link>
      </div>
      <div className="ml-auto mr-4">
        <UserButton />
      </div>
    </nav>
  );
};
