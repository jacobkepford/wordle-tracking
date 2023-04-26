import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wordle Tracking</title>
        <meta name="description" content="Track your Wordle group scores" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <>
          <div className={styles.grid}>
            <Link href="/upload" className={styles.card}>
              <h2>Upload Scores &rarr;</h2>
              <p>Upload your score to the tracker</p>
            </Link>
            <Link href="/userscore/1" className={styles.card}>
              <h2>View Scores &rarr;</h2>
              <p>View a chart of your uploaded scores</p>
            </Link>
            <Link href="/admin/landing" className={styles.card}>
              <h2>Administration &rarr;</h2>
              <p>Access administration features of the application</p>
            </Link>
          </div>
        </>
      </main>
      <footer className={styles.footer}>
        <p>Powered by Wileskep</p>
      </footer>
    </div>
  );
};

export default Home;
