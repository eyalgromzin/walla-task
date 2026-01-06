import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Meme Gallery</h1>
      <p className={styles.subtitle}>Browse and edit your favorite memes</p>
    </header>
  );
}
