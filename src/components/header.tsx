import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Header = () => {
  return (
    <nav>
      <div className="flex flex-wrap justify-between">
        <Link href="/" className="ml-4 text-3xl">
          Wordle Tracker
        </Link>
        <ul className="mr-4 flex flex-row space-x-8 text-xl">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/upload">Upload</Link>
          </li>
          <li>
            <Link href="/userscore">Your Scores</Link>
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};
