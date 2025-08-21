interface InputProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder: string;
    icon: React.ReactNode;
    showPasswordToggle?: boolean;
    onTogglePassword?: () => void;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isVerified: boolean;
}

interface AuthState {
  currentView: 'login' | 'signup' | 'forgot' | 'verify';
  user: User | null;
  isLoading: boolean;
  error: string | null;
  pendingEmail: string | null;
}

interface FormErrors {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}