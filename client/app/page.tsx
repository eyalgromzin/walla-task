'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './page.module.css';
import { Meme, EditModalState } from './types/meme';
import Header from './components/Header';
import ErrorBanner from './components/ErrorBanner';
import MemeCard from './components/MemeCard';
import EditModal from './components/EditModal';
import LoadingSpinner from './components/LoadingSpinner';

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
  const isFetchingRef = useRef(false);

  // Fetch memes with pagination
  const fetchMemes = useCallback(async (pageNum: number) => {
    if (isFetchingRef.current) return;
    
    isFetchingRef.current = true;

    setError(null);
    setIsLoading(true);
    try {
      const initialCount = process.env.INITIAL_MEMES_COUNT || '10';
      const pageSize = process.env.PAGE_SIZE || '10';
      const currentPageSize = pageNum === 1 ? initialCount : pageSize;
      const response = await fetch(`/api/memes?pageNumber=${pageNum}&pageSize=${currentPageSize}`);

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
      isFetchingRef.current = false;
    }
  }, []);

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
      { threshold: 0.1, rootMargin: '100px' }
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
            m._id === editModal.meme?._id ? updatedMeme.data : m
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

  return (
    <div className={styles.container}>
      <Header />

      {error ? (
        <ErrorBanner error={error} />
      ) : memes.length === 0 && !isLoading ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📭</div>
          <p className={styles.emptyText}>Loading memes...</p>
        </div>
      ) : (
        <>
          <div className={styles.listContainer}>
            {memes.map((meme) => (
              <MemeCard
                key={meme._id}
                meme={meme}
                onEdit={handleEditClick}
              />
            ))}
          </div>

          {isLoading && <LoadingSpinner />}

          {!hasMore && memes.length > 0 && (
            <div className={styles.endMessage}>
              You've reached the end! ({memes.length} memes loaded)
            </div>
          )}

          <div ref={observerTarget} style={{ height: '20px' }}></div>
        </>
      )}

      <EditModal
        editModal={editModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        onNameChange={(name) =>
          setEditModal((prev) => ({ ...prev, newName: name }))
        }
      />
    </div>
  );
}
