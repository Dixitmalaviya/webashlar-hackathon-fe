import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface CommonInputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  className?: string;
  max?: string;
}

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  icon,
  showPasswordToggle,
  onTogglePassword,
  className = '',
  max,
}) => (
  <div className={`mb-4 ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    )}
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <div className="h-5 w-5 text-gray-400">{icon}</div>
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`block w-full ${icon ? 'pl-10' : 'pl-4'} pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
        {...(max ? { max } : {})}
      />
      {showPasswordToggle && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={onTogglePassword}
        >
          <div className="h-5 w-5 text-gray-400">
            {type === 'password' ? <EyeOff /> : <Eye />}
          </div>
        </button>
      )}
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default CommonInput;
