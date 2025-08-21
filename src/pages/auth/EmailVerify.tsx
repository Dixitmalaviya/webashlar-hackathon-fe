import { CheckCircle, Mail } from "lucide-react";
import Button from "../../component/Button";
import { useState } from "react";

const EmailVerification: React.FC = () => {
    const [isVerified, _setIsVerified] = useState(false);

    // const handleResendEmail = useCallback(() => {
    //     dispatch({ type: 'SET_LOADING', payload: true });
    //     setTimeout(() => {
    //         dispatch({ type: 'SET_LOADING', payload: false });
    //     }, 1500);
    // }, []);

    // const simulateVerification = useCallback(() => {
    //     // dispatch({ type: 'SET_LOADING', payload: true });
    //     setTimeout(() => {
    //         setIsVerified(true);
    //         // dispatch({ type: 'SET_LOADING', payload: false });
    //     }, 2000);
    // }, []);

    if (isVerified) {
        return (
            <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Email Verified!</h2>
                    <p className="text-gray-600 mb-6">
                        Your email has been successfully verified. You can now sign in to your account.
                    </p>
                </div>
                <Button onClick={() => {}}>
                    Continue to Sign In
                </Button>
            </div>
        );
    }

    return (
        <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
            </div>

            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                <p className="text-gray-600 mb-6">
                    We've sent a verification link to <strong>{"pendingEmail"}</strong>.
                    Please check your email and click the link to verify your account.
                </p>
            </div>

            <div className="space-y-4">
                <Button onClick={()=>{}}>
                    Simulate Email Verification
                </Button>

                <Button onClick={()=>{}} variant="secondary">
                    Resend Verification Email
                </Button>
            </div>

            <p className="text-sm text-gray-600">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                    onClick={()=>{}}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    try again
                </button>
            </p>
        </div>
    );
};

export default EmailVerification;