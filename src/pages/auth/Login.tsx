import { Lock, Mail } from "lucide-react";
import { useCallback, useState } from "react";
import Button from "../../component/Button";
import Input from "../../component/Input";
import useFormValidation from "../../hooks/validation";

// Login Component
const LoginForm: React.FC<any> = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const { validateEmail, validatePassword } = useFormValidation();

  const handleSubmit = useCallback(async () => {
    const newErrors: FormErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      return;
    }

    // dispatch({ type: 'SET_LOADING', payload: true });
    
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        email: formData.email,
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+1234567890',
        isVerified: true
      };
      console.log('Login successful:', mockUser);
    //   dispatch({ type: 'SET_USER', payload: mockUser });
    }, 1500);
  }, [formData, validateEmail, validatePassword]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to your account</p>
      </div>

      <Input
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
        error={errors.email}
        placeholder="Enter your email"
        icon={<Mail />}
      />

      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
        error={errors.password}
        placeholder="Enter your password"
        icon={<Lock />}
        showPasswordToggle
        onTogglePassword={() => setShowPassword(!showPassword)}
      />

      <Button onClick={handleSubmit}>
        Sign In
      </Button>

      <div className="text-center space-y-4">
        <button
          onClick={() => {}}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Forgot your password?
        </button>
        
        <p className="text-gray-600 text-sm">
          Don't have an account?{' '}
          <button
            onClick={() =>{}}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;