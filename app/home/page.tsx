// /home/page.tsx

import Link from 'next/link';
import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <Link href="/gamepage" className={styles.startButton}>
        Start Game
      </Link>
    </main>
  );
}
