
import { useState } from 'react';

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Tem certeza?');
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const showConfirm = (confirmMessage: string, confirmAction: () => void) => {
    setMessage(confirmMessage);
    setOnConfirm(() => confirmAction);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    onConfirm?.();
    setIsOpen(false);
    setOnConfirm(null);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setOnConfirm(null);
  };

  // Simple confirm using browser's native confirm dialog
  const confirm = (confirmMessage: string): boolean => {
    return window.confirm(confirmMessage);
  };

  return {
    isOpen,
    message,
    showConfirm,
    handleConfirm,
    handleCancel,
    confirm,
  };
};
