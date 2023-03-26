import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const user = useUser();

  return (
    <div className={styles.container}>
      <Head>
        <title>Wordle Tracking</title>
        <meta name="description" content="Track your Wordle group scores" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        {!user.isSignedIn && <SignInButton />}
        {user.isSignedIn && (
          <>
            <h1 className={styles.title}>Wordle Tracker</h1>

            <div className={styles.grid}>
              <Link href="/upload">
                <a className={styles.card}>
                  <h2>Upload Scores &rarr;</h2>
                  <p>Upload your score to the tracker</p>
                </a>
              </Link>
              <Link href="/userscore/1">
                <a className={styles.card}>
                  <h2>View Scores &rarr;</h2>
                  <p>View a chart of your uploaded scores</p>
                </a>
              </Link>
              <a href="https://nextjs.org/learn" className={styles.card}>
                <h2>Administration &rarr;</h2>
                <p>Access administration features of the application</p>
              </a>
            </div>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Powered by Wileskep</p>
      </footer>
    </div>
  );
};

export default Home;
