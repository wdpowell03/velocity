'use client';

import styles from './about.module.css';
import Link from 'next/link';

export default function About() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back
        </Link>
        <h1 className={styles.title}>About Velocity Bot</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h2 className={styles.eventTitle}>Velocity Pitch Competition</h2>
          <p className={styles.tagline}>A 12-week sprint to unicorn speed</p>
        </section>

        <section className={styles.section}>
          <h3>What Is Velocity Bot?</h3>
          <p>
            I'm here to help founders develop and refine their 12-week roadmap for the 
            Velocity Pitch Competition. Whether you're brainstorming ideas, planning your 
            execution strategy, or looking to understand what unicorn speed looks like, 
            I can provide guidance and insights to help shape your journey.
          </p>
        </section>

        <section className={styles.section}>
          <h3>How I Can Help</h3>
          <ul className={styles.benefitsList}>
            <li>Brainstorm and refine your startup idea</li>
            <li>Develop your 12-week execution roadmap</li>
            <li>Understand what makes a compelling pitch</li>
            <li>Get insights on customer acquisition and revenue strategies</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h3>More Info</h3>
          <a 
            href="https://www.kycombinator.com/velocity" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.button}
          >
            KY Combinator
          </a>
        </section>
      </main>
    </div>
  );
}
