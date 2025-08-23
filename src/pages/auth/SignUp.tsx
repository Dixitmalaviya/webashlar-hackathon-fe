import { Lock, Mail, Phone, User } from "lucide-react";
import Button from "../../component/Button";
import Input from "../../component/Input";
import { useCallback, useState } from "react";
import useFormValidation from "../../hooks/validation";
import { useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const { validateEmail, validatePassword, validatePhoneNumber, validateName } = useFormValidation();
    const navigate = useNavigate();

    const handleSubmit = useCallback(async () => {
        const newErrors: FormErrors = {
            firstName: validateName(formData.firstName, 'First name'),
            lastName: validateName(formData.lastName, 'Last name'),
            email: validateEmail(formData.email),
            phoneNumber: validatePhoneNumber(formData.phoneNumber),
            password: validatePassword(formData.password),
        };

        if (Object.values(newErrors).some(error => error)) {
            setErrors(newErrors);
            return;
        }

        // dispatch({ type: 'SET_LOADING', payload: true });
        // dispatch({ type: 'SET_PENDING_EMAIL', payload: formData.email });

        // Simulate API call
        // setTimeout(() => {
        //     dispatch({ type: 'SET_VIEW', payload: 'verify' });
        //     dispatch({ type: 'SET_LOADING', payload: false });
        // }, 1500);
    }, [formData, validateEmail, validatePassword, validatePhoneNumber, validateName]);

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Join us today</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="First Name"
                    type="text"
                    value={formData.firstName}
                    onChange={(value) => setFormData(prev => ({ ...prev, firstName: value }))}
                    error={errors.firstName}
                    placeholder="First name"
                    icon={<User />}
                />

                <Input
                    label="Last Name"
                    type="text"
                    value={formData.lastName}
                    onChange={(value) => setFormData(prev => ({ ...prev, lastName: value }))}
                    error={errors.lastName}
                    placeholder="Last name"
                    icon={<User />}
                />
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
                label="Phone Number"
                type="tel"
                value={formData.phoneNumber}
                onChange={(value) => setFormData(prev => ({ ...prev, phoneNumber: value }))}
                error={errors.phoneNumber}
                placeholder="Enter your phone number"
                icon={<Phone />}
            />

            <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                error={errors.password}
                placeholder="Create a password"
                icon={<Lock />}
                showPasswordToggle
                onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <Button onClick={handleSubmit}>
                Create Account
            </Button>

            <p className="text-center text-gray-600 text-sm">
                Already have an account?{' '}
                <button
                    onClick={() => navigate('/login')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    Sign in
                </button>
            </p>
        </div>
    );
};

export default SignupForm;