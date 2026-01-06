import styles from '../page.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}
