import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}
