import { NextPage } from "next";
import styles from "../../styles/AdminLanding.module.css";
import Link from "next/link";

const Landing: NextPage = () => {
  return (
    <main className={styles.main}>
      <>
        <div className={styles.grid}>
          <Link href="/admin/preauthorize" className={styles.card}>
            <h2>Pre Authorize Accounts</h2>
            <p>
              Add email addresses that should automatically be provided access
            </p>
          </Link>
        </div>
      </>
    </main>
  );
};

export default Landing;
