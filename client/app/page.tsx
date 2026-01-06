import styles from './page.module.css';
import { Meme } from './types/meme';
import Header from './components/Header/Header';
import ErrorBanner from './components/ErrorBanner/ErrorBanner';
import MemeList from './components/MemeList/MemeList';
import { config } from '@/config';

async function getInitialMemes() {
  try {
    const initialCount = config.INITIAL_MEMES_COUNT;
    const serverUrl = `${config.NEXT_PUBLIC_API_URL}/api/memes?pageNumber=1&pageSize=${initialCount}`;
    
    const response = await fetch(serverUrl, {
      cache: 'no-store', // Ensure fresh data on each request
    });

    if (!response.ok) {
      throw new Error('Failed to fetch memes from server');
    }

    const data = await response.json();
    
    if (data.success) {
      return {
        memes: data.data as Meme[],
        hasMore: data.pagination.pages > 1,
        error: null,
      };
    } else {
      throw new Error(data.error || 'Failed to fetch memes');
    }
  } catch (error: any) {
    console.error('Error fetching initial memes:', error);
    return {
      memes: [] as Meme[],
      hasMore: false,
      error: error?.message || 'Failed to fetch memes from server',
    };
  }
}

export default async function Home() {
  const { memes, hasMore, error } = await getInitialMemes();

  return (
    <div className={styles.container}>
      <Header />

      {error ? (
        <ErrorBanner error={error} />
      ) : (
        <MemeList 
          initialMemes={memes} 
        />
      )}
    </div>
  );
}
