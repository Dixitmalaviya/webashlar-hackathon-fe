import { useCallback } from "react";

const useFormValidation = () => {
  const validateEmail = useCallback((email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  }, []);

  const validatePassword = useCallback((password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    return undefined;
  }, []);

  const validatePhoneNumber = useCallback((phone: string): string | undefined => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phone) return 'Phone number is required';
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    return undefined;
  }, []);

  const validateName = useCallback((name: string, fieldName: string): string | undefined => {
    if (!name) return `${fieldName} is required`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters`;
    if (!/^[a-zA-Z\s]+$/.test(name)) return `${fieldName} can only contain letters and spaces`;
    return undefined;
  }, []);

  return { validateEmail, validatePassword, validatePhoneNumber, validateName };
};

export default useFormValidation;