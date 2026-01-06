import Image from 'next/image';
import styles from './MemeCard.module.css';
import { Meme } from '../../types/meme';

interface MemeCardProps {
  meme: Meme;
  onEdit: (meme: Meme) => void;
}

export default function MemeCard({ meme, onEdit }: MemeCardProps) {
  return (
    <div className={styles.memeCard}>
      <div className={styles.memeImage}>
        <Image
          src={meme.url}
          alt={meme.name}
          width={280}
          height={200}
          priority={false}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="200"%3E%3Crect fill="%23f0f0f0" width="280" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="14" fill="%23999"%3EImage not available%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>
      <div className={styles.memeContent}>
        <h3 className={styles.memeName}>{meme.name}</h3>
        <button
          className={styles.editButton}
          onClick={() => onEdit(meme)}
        >
          ✏️ Edit
        </button>
      </div>
    </div>
  );
}
