import React from 'react';
import CommonButton from './CommonButton';

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

const CommonModal: React.FC<CommonModalProps> = ({ isOpen, onClose, title, children, width = 'max-w-md' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className={`bg-white rounded-xl shadow-lg p-6 w-full ${width} relative`}
        style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      >
        <CommonButton
          onClick={onClose}
          className="absolute top-3 right-3 !bg-transparent !text-gray-400 hover:!text-primary text-2xl font-bold p-0 w-10 h-10 min-w-0 min-h-0 flex items-center justify-center focus:outline-none"
          aria-label="Close"
        >
          &times;
        </CommonButton>
        {title && <h2 className="text-xl font-semibold mb-4 text-primary">{title}</h2>}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
