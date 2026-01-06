import styles from '../page.module.css';

interface ErrorBannerProps {
  error: string;
}

export default function ErrorBanner({ error }: ErrorBannerProps) {
  return (
    <div className={styles.errorBanner}>
      There was currently an issue with the website. We're handling it, please try again later.
    </div>
  );
}
