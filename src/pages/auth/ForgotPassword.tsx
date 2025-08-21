import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import Button from "../../component/Button";
import Input from "../../component/Input";
import { useCallback, useState } from "react";
import useFormValidation from "../../hooks/validation";

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const { validateEmail } = useFormValidation();

    const handleSubmit = useCallback(async () => {
        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            return;
        }

        // dispatch({ type: 'SET_LOADING', payload: true });

        // Simulate API call
        setTimeout(() => {
            setEmailSent(true);
            // dispatch({ type: 'SET_LOADING', payload: false });
        }, 1500);
    }, [email, validateEmail]);

    if (emailSent) {
        return (
            <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                    <p className="text-gray-600 mb-6">
                        We've sent a password reset link to <strong>{email}</strong>
                    </p>
                </div>
                <Button
                    onClick={() => { }}
                    variant="secondary"
                >
                    Back to Sign In
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <button
                    onClick={() => { }}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Sign In
                </button>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                <p className="text-gray-600">Enter your email to reset your password</p>
            </div>

            <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
                error={error}
                placeholder="Enter your email"
                icon={<Mail />}
            />

            <Button onClick={handleSubmit}>
                Send Reset Link
            </Button>
        </div>
    );
};

export default ForgotPasswordForm;