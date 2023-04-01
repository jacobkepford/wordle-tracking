import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const routerPath = router.pathname;
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
          className={`text-1xl rounded px-4 py-4 hover:bg-slate-800 ${
            routerPath == "/" ? "active" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/upload"
          className={`text-1xl rounded px-4 py-4 hover:bg-slate-800 ${
            routerPath == "/upload" ? "active" : ""
          }`}
        >
          Upload
        </Link>
        <Link
          href="/userscore"
          className={`text-1xl rounded px-4 py-4 hover:bg-slate-800 ${
            routerPath == "/userscore" ? "active" : ""
          }`}
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
