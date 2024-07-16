import Link from 'next/link';
import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <h1>Welcome to CoreWorld Space-Miner</h1>
      <p>Click the button below to start the game.</p>
      <Link href="/GamePage" className={styles.startButton}>
        Start Game
      </Link>
    </main>
  );
}
