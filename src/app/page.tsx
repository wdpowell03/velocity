import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Velocity Bot</h1>
        <div className={styles.ctas}>
          <Link href="/chat" className={styles.primary}>
            Chat
          </Link>
          <Link href="/about" className={styles.secondary}>
            About
          </Link>
        </div>
      </main>
    </div>
  );
}
