'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

interface Meme {
  _id: string;
  id: string;
  name: string;
  url: string;
}

interface EditModalState {
  isOpen: boolean;
  meme: Meme | null;
  newName: string;
  isLoading: boolean;
}

export default function Home() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [editModal, setEditModal] = useState<EditModalState>({
    isOpen: false,
    meme: null,
    newName: '',
    isLoading: false,
  });

  const [error, setError] = useState<string | null>(null);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch memes with pagination
  const fetchMemes = useCallback(async (pageNum: number) => {
    if (isLoading) return;

    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/memes?page=${pageNum}&limit=10`);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to fetch from server');
      }

      const data = await response.json();

      if (data.success) {
        setMemes((prevMemes) =>
          pageNum === 1 ? data.data : [...prevMemes, ...data.data]
        );
        setHasMore(pageNum < data.pagination.pages);
      } else {
        throw new Error(data.error || 'Failed to fetch memes');
      }
    } catch (err: any) {
      console.error('Error fetching memes:', err);
      setError(err?.message || 'Failed to fetch memes from server');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Initial load
  useEffect(() => {
    fetchMemes(1);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoading]);

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchMemes(page);
    }
  }, [page, fetchMemes]);

  // Handle edit button click
  const handleEditClick = (meme: Meme) => {
    setEditModal({
      isOpen: true,
      meme,
      newName: meme.name,
      isLoading: false,
    });
  };

  // Handle modal close
  const handleCloseModal = () => {
    setEditModal({
      isOpen: false,
      meme: null,
      newName: '',
      isLoading: false,
    });
  };

  // Handle save
  const handleSave = async () => {
    if (!editModal.meme || !editModal.newName.trim()) return;

    setEditModal((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`/api/memes/${editModal.meme._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editModal.newName }),
      });

      if (response.ok) {
        const updatedMeme = await response.json();
        // Update memes list with new name
        setMemes((prevMemes) =>
          prevMemes.map((m) =>
            m._id === editModal.meme._id ? updatedMeme.data : m
          )
        );
        handleCloseModal();
      } else {
        alert('Failed to update meme name');
      }
    } catch (error) {
      console.error('Error saving meme:', error);
      alert('Error saving meme');
    } finally {
      setEditModal((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // Handle modal background click
  const handleModalBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Meme Gallery</h1>
        <p className={styles.subtitle}>Browse and edit your favorite memes</p>
      </header>

      {error ? (
        <div className={styles.errorBanner}>
          <strong>Error:</strong> {error}
          <div style={{ marginTop: 8 }}>
            Please check your MongoDB connection in `.env.local` and ensure the
            database is reachable. If using Atlas, verify your connection string
            and IP whitelist.
          </div>
        </div>
      ) : memes.length === 0 && !isLoading ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📭</div>
          <p className={styles.emptyText}>Loading memes...</p>
        </div>
      ) : (
        <>
          <div className={styles.listContainer}>
            {memes.map((meme) => (
              <div key={meme._id} className={styles.memeCard}>
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
                    onClick={() => handleEditClick(meme)}
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isLoading && (
            <div className={styles.loading}>
              <div className={styles.loadingSpinner}></div>
            </div>
          )}

          {!hasMore && memes.length > 0 && (
            <div className={styles.endMessage}>
              You've reached the end! ({memes.length} memes loaded)
            </div>
          )}

          <div ref={observerTarget} style={{ height: '20px' }}></div>
        </>
      )}

      {/* Edit Modal */}
      {editModal.isOpen && editModal.meme && (
        <div
          className={styles.modalOverlay}
          onClick={handleModalBackgroundClick}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Edit Meme Name</h2>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Meme Name</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={editModal.newName}
                  onChange={(e) =>
                    setEditModal((prev) => ({
                      ...prev,
                      newName: e.target.value,
                    }))
                  }
                  placeholder="Enter new meme name"
                  autoFocus
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.buttonSecondary}
                onClick={handleCloseModal}
                disabled={editModal.isLoading}
              >
                Cancel
              </button>
              <button
                className={styles.buttonPrimary}
                onClick={handleSave}
                disabled={editModal.isLoading || !editModal.newName.trim()}
              >
                {editModal.isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
