import styles from '../page.module.css';
import { EditModalState, Meme } from '../types/meme';

interface EditModalProps {
  editModal: EditModalState;
  onClose: () => void;
  onSave: () => void;
  onNameChange: (name: string) => void;
}

export default function EditModal({
  editModal,
  onClose,
  onSave,
  onNameChange,
}: EditModalProps) {
  if (!editModal.isOpen || !editModal.meme) {
    return null;
  }

  const handleModalBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
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
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter new meme name"
              autoFocus
            />
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.buttonSecondary}
            onClick={onClose}
            disabled={editModal.isLoading}
          >
            Cancel
          </button>
          <button
            className={styles.buttonPrimary}
            onClick={onSave}
            disabled={editModal.isLoading || !editModal.newName.trim()}
          >
            {editModal.isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
