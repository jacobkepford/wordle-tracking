import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Header = () => {
  return (
    <nav>
      <div className="flex flex-wrap justify-between">
        <Link href="/" className="ml-4 mt-4 text-3xl">
          Wordle Tracker
        </Link>
        <ul className="mr-4 mt-4 flex flex-row space-x-2 text-xl">
          <li>
            <Link href="/" className="rounded py-4 px-8 hover:bg-slate-800">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/upload"
              className="inline rounded py-4 px-8 hover:bg-slate-800"
            >
              Upload
            </Link>
          </li>
          <li>
            <Link
              href="/userscore"
              className="rounded py-4 px-8 hover:bg-slate-800"
            >
              Your Scores
            </Link>
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};
