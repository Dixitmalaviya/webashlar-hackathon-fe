import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "../../service/Auth/AuthService";
import {
    FaEnvelope,
    FaLock,
    FaEthereum,
    FaUser,
    FaEye,
    FaGlobeAmericas,
    FaMapMarkerAlt
} from "react-icons/fa";

const CreateHospital = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { registerHospitalService } = authService;
    const [countries, setCountries] = useState(["United States", "Canada", "India", "United Kingdom", "Germany"]);
    const [states, setStates] = useState(["California", "Texas", "New York", "Ontario", "Gujarat"]);

    const registerSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        wallet: Yup.string()
            .required("wallet Address is required"),
        name: Yup.string()
            .required("Name is required"),
        country: Yup.string()
            .required("Country is required"),
        state: Yup.string()
            .required("State is required"),
        address: Yup.string()
            .required("Address is required"),
    });

    const initialRegistrationValues = {
        name: "",
        email: "",
        password: "",
        wallet: "",
        role: "",
    };

    const handleRegister = (
        values: typeof initialRegistrationValues
    ) => {
        if (values) {
            registerHospitalService(values)
                .then((res) => {
                    console.log("Login Response", res);
                    //   navigate("/profile");
                })
                .catch((error) => {
                    console.error("Error logging in", error);
                });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 font-inter relative overflow-hidden">
            {/* Brand */}
            <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
                <div className="w-50 h-10 flex items-center justify-center text-white text-lg font-bold">
                    {/* <FaHeartbeat /> */}
                    <img
                        src={"/logo-without-name.png"}
                        alt="Logo"
                        className="w-10 h-10 object-contain drop-shadow-md"
                    />
                </div>
                <span className="text-2xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    HealthSync
                </span>
            </div>

            <div className="flex items-center justify-center min-h-screen p-4">
                <div
                    className={`relative w-full max-w-5xl min-h-[650px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-700`}
                >

                    {/* Panels */}
                    <div
                        className={`flex w-[200%] h-full transition-transform duration-700`}
                    >

                        {/* REGISTER PANEL */}
                        <div className="w-1/2 flex flex-col justify-center p-10">
                            <div className="max-w-md w-full mx-auto animate-fadeIn">
                                <h1 className="text-4xl font-bold font-space text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                    Join HealthSync
                                </h1>
                                <p className="text-gray-400 text-center mt-2 mb-8">
                                    Register your healthcare institution and manage medical identities securely via blockchain
                                </p>

                                <Formik
                                    initialValues={initialRegistrationValues}
                                    validationSchema={registerSchema}
                                    onSubmit={handleRegister}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className="space-y-5">
                                            <div className="relative">
                                                <label className="flex justify-start block text-sm text-gray-300 mb-2">
                                                    Hospital Name
                                                </label>
                                                <div className="relative">
                                                    <FaUser className="absolute left-4 top-4 text-blue-300/70" />
                                                    <Field
                                                        name="name"
                                                        className="w-full bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="Enter Hospital Name"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1 flex justify-start"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="flex justify-start block text-sm text-gray-300 mb-2">
                                                    Official Email
                                                </label>
                                                <div className="relative">
                                                    <FaEnvelope className="absolute left-4 top-4 text-blue-300/70" />
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        className="w-full bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="Enter Your Official Hospital Email"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1 flex justify-start"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="flex justify-start block text-sm text-gray-300 mb-2">
                                                    Password
                                                </label>
                                                <div className="relative">
                                                    <FaLock className="absolute left-4 top-4 text-blue-300/70" />
                                                    <Field
                                                        name="password"
                                                        type={showPassword ? "text" : "password"}
                                                        className="w-full bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="Create password"
                                                    />
                                                    <FaEye
                                                        className="absolute right-4 top-4 text-gray-400 cursor-pointer hover:text-blue-400"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="password"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1 flex justify-start"
                                                />
                                            </div>
                                            <div className="relative">
                                                <label className="flex justify-start block text-sm text-gray-300 mb-2">
                                                    Country
                                                </label>
                                                <div className="relative">
                                                    <FaGlobeAmericas className="absolute left-4 top-4 text-blue-300/70" />
                                                    <Field
                                                        as="select"
                                                        name="country"
                                                        className="w-full bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                                    >
                                                        <option value="">Select Country</option>
                                                        {
                                                            countries && countries.map((country) => {
                                                                return (
                                                                    <option value={country}>{country}</option>
                                                                )
                                                            })
                                                        }
                                                        {/* Add more countries as needed */}
                                                    </Field>
                                                </div>
                                                <ErrorMessage
                                                    name="country"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1 flex justify-start"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="flex justify-start block text-sm text-gray-300 mb-2">
                                                    State
                                                </label>
                                                <div className="relative">
                                                    <FaGlobeAmericas className="absolute left-4 top-4 text-blue-300/70" />
                                                    <Field
                                                        as="select"
                                                        name="state"
                                                        className="w-full bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                                    >
                                                        <option value="">Select State</option>
                                                        {
                                                            states && states.map((state) => {
                                                                return (
                                                                    <option value={state}>{state}</option>
                                                                )
                                                            })
                                                        }
                                                        {/* Add more countries as needed */}
                                                    </Field>
                                                </div>
                                                <ErrorMessage
                                                    name="state"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1 flex justify-start"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="flex justify-start block text-sm text-gray-300 mb-2">
                                                    Address
                                                </label>
                                                <div className="relative">
                                                    <FaMapMarkerAlt className="absolute left-4 top-4 text-blue-300/70" />
                                                    <Field
                                                        type="text"
                                                        name="address"
                                                        className="w-full bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="Enter hospital address"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="address"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1 flex justify-start"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="flex justify-start block text-sm text-gray-300 mb-2">
                                                    Wallet Address
                                                </label>
                                                <div className="relative">
                                                    <FaEthereum className="absolute left-4 top-4 text-blue-300/70" />
                                                    <Field
                                                        name="wallet"
                                                        className="w-full bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="0x..."
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="wallet"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1 flex justify-start"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-3 rounded-xl font-semibold uppercase tracking-wide text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:scale-[1.02] transition"
                                            >
                                                {isSubmitting ? "Creating..." : "Create Account"}
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateHospital;