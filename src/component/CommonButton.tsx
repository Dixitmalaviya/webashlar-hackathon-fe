import React from 'react';

interface CommonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  onClick,
  isLoading = false,
  disabled = false,
  variant = 'primary',
  className = '',
  type = 'button',
}) => {
  const baseClasses =
    'w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center';
  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:bg-gray-50';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      ) : (
        children
      )}
    </button>
  );
};

export default CommonButton;
