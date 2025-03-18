import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
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
        <div className={styles.imageContainer}>
         <Image
            src="/kycomb.webp"
            alt="KY Combinator"
            width={200}
            height={80}
            priority
            className={styles.image}
          />
          </div>
      </main>
    </div>
  );
}
