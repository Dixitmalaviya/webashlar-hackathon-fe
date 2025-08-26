import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import authService from "../../service/Auth/AuthService";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaUserPlus,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import PatientService from "../../service/Patient/PatientService";


const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loginService } = authService;
  const location = useLocation();
  
    // const relationships = ['Spouse', 'Parent', 'Sibling', 'Friend', 'Other'];
    // const relationshipOptions = relationships.map(r => ({ label: r, value: r }));

  useEffect(() => {
    const hash = location.hash;
    if (hash === "#signup") {
      setShowRegister(true);
    }
  }, [location.hash]);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    // wallet: Yup.string()
    //   .required("wallet Address is required"),
    fullName: Yup.string()
      .required("Name is required"),
      phone: Yup.string()
      .required("Phone Number is required"),
      dob: Yup.string()
      .required("Date Of Birth   is required"),
      emContName: Yup.string()
      .required("Emergency Contact Name is required"),
      emContPhone: Yup.string()
      .required("Emergency Contact Number is required"),
      // emContRelation: Yup.string()
      // .required("relation is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const [initialRegistrationValues, setInitialRegistrationValues] = useState({
    fullName: "",
    email: "",
    password: "",
    wallet: "",
    phone: '',
    dob:'',
    emContName: '',
    emContPhone: '',
    emContRelation: '',
    role: 'patient'
  });

  // Submit handler
  const handleSubmit = (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    console.log("Login form data:", values);
    if (values.email && values.password) {
      loginService(values.email, values.password)
        .then((res) => {
          actions.setSubmitting(false);
          console.log("Login Response", res);
          localStorage.setItem("auth", res?.data?.data?.token);
          if (res?.data?.data?.user?.role == "patient") {
            navigate("/profile");
            localStorage.setItem("userId", res?.data?.data?.user?.entityId);
            localStorage.setItem("role", "patient");
          }
          else if (res?.data?.data?.user?.role == "doctor") {
            navigate("/patients");
            localStorage.setItem("userId", res?.data?.data?.user?.entityId);
            localStorage.setItem("role", "doctor");
          }
        })
        .catch((error) => {
          actions.setSubmitting(false);
          console.error("Error logging in", error);
        });
    }

    // Here you would usually call an API or trigger auth logic
  };

  const handleRegister = (values: typeof initialRegistrationValues,
    _actions: FormikHelpers<typeof initialRegistrationValues>
  ) => {
          // actions.setSubmitting(false);
    console.log(values);
    toast
      .promise(PatientService.createPatientService(values), {
        loading: "Loading",
        success: "Patient Registered successfully",
        error: "Error Registering Patient",
      })
      .then((response: any) => {
        console.log("response", response);
        setInitialRegistrationValues({
          fullName: "",
          email: "",
          password: "",
          wallet: "",
          phone: "",
          dob: "",
          emContName: "",
          emContPhone: "",
          emContRelation: "Friend",
          role: 'patient'
        });
        setShowRegister(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 font-inter relative overflow-hidden">
      {/* Brand */}
      <div className="absolute top-6 left-6 flex items-center gap-3 z-10 cursor-pointer" onClick={() => navigate("/")}>
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
          className={`relative w-full max-w-5xl min-h-[650px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ${
            showRegister ? "translate-x-0" : ""
          }`}
        >
          {/* Toggle Button */}
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={() => {
                setShowRegister(!showRegister);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-300 border border-blue-400/40 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 hover:text-white shadow transition"
            >
              <FaUserPlus /> {showRegister ? "Login" : "Register"}
            </button>
          </div>

          {/* Panels */}
          <div
            className={`flex w-[200%] h-full transition-transform duration-700 ${
              showRegister ? "-translate-x-1/2" : ""
            }`}
          >
            {/* LOGIN PANEL */}
            <div className="w-1/2 flex flex-col justify-center p-10">
              <div className="max-w-md w-full mx-auto animate-fadeIn">
                <h1 className="text-4xl font-bold font-space text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-gray-400 text-center mt-2 mb-8">
                  Access your unified health records with AI-powered insights
                </p>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-5">
                      {/* Email */}
                      <div className="relative">
                        <label className="flex justify-start block text-sm text-gray-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-4 text-blue-300/70" />
                          <Field
                            type="email"
                            name="email"
                            className="w-full bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-start"
                            placeholder="Enter your email"
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="flex text-red-500 text-sm mt-1 justify-start"
                        />
                      </div>

                      {/* Password */}
                      <div className="relative">
                        <label className="flex justify-start block text-sm text-gray-300 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-4 text-blue-300/70" />
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="w-full bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                          />
                          <FaEye
                            className="absolute right-4 top-4 text-gray-400 cursor-pointer hover:text-blue-400"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="flex text-red-500 text-sm mt-1 justify-start"
                        />
                      </div>
                      <div className="text-right">
                        <a
                          className="text-blue-300 hover:text-white text-sm font-medium"
                          onClick={() => navigate("forget-password")}
                        >
                          Forgot Password?
                        </a>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl font-semibold uppercase tracking-wide text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:scale-[1.02] transition"
                      >
                        {isSubmitting ? "Logging in..." : "Sign In"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {/* REGISTER PANEL */}
            <div className="w-1/2 flex flex-col justify-center p-10">
              <div className="max-w-md w-full mx-auto animate-fadeIn">
                <h1 className="text-4xl font-bold font-space text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Join HealthSync
                </h1>
                <p className="text-gray-400 text-center mt-2 mb-8">
                  Create your secure health identity with blockchain protection
                </p>

                <Formik
                  initialValues={initialRegistrationValues}
                  validationSchema={registerSchema}
                  onSubmit={handleRegister}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-5">
                      <div className="relative">
                        <label className="block text-sm text-gray-300 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-4 top-4 text-blue-300/70" />
                          <Field
                            name="fullName"
                            className="w-full bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter full name"
                          />
                        </div>
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-sm text-gray-300 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-4 text-blue-300/70" />
                          <Field
                            type="email"
                            name="email"
                            className="w-full bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email"
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-sm text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-4 top-4 text-blue-300/70" />
                          <Field
                            name="phone"
                            type="text"
                            className="w-full text-white bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Phone Number"
                          />
                        </div>
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-sm text-gray-300 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-4 text-blue-300/70" />
                          <Field
                            // type="password"
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
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      {/* <div className="relative">
                        <label className="block text-sm text-gray-300 mb-2">
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
                          className="text-red-500 text-sm mt-1"
                        />
                      </div> */}
                        
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">
                          Date Of Birth
                        </label>
                        <div className="relative">
                          <Field
                            name="dob"
                            type="date"
                            className="w-full text-white bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <ErrorMessage
                          name="dob"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      
                      
                      <div className="relative flex">
                      <div className="relative">
                        <label className="block text-sm text-gray-300 mb-2">
                          Emergency Contact Name
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-4 top-4 text-blue-300/70" />
                          <Field
                            // type="password"
                            name="emContName"
                            type="text"
                            className="w-full bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Name"
                          />
                        </div>
                        <ErrorMessage
                          name="emContName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                       <div className="relative ml-2">
                        <label className="block text-sm text-gray-300 mb-2">
                          Emergency Contact Phone
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-4 top-4 text-blue-300/70" />
                          <Field
                            name="emContPhone"
                            type="text"
                            className="w-full text-white bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <ErrorMessage
                          name="emContPhone"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      {/* <div className="relative ml-2">
                        <label className="block text-sm text-gray-300 mb-2">
                          Relation With Them
                        </label>
                        <div className="relative">
                          <Field
                            name="emContRelation"
                            as="select"
                            value={initialRegistrationValues.emContRelation}
                            onChange={(e: any) => {
                              setInitialRegistrationValues({...initialRegistrationValues, emContRelation: e.target.value})}}
                            className="w-full text-white bg-gray-800/70 border border-blue-400/30 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Relation</option>
                            {
                              relationshipOptions && relationshipOptions.map(relation => 
                                // return (
                                    <option value={relation.value}>{relation.label}</option>
                                // )
                              )
                            }
                          </Field>
                        </div>
                        <ErrorMessage
                          name="emContRelation"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div> */}
                      
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
};

export default LoginForm;
