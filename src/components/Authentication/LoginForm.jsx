import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { useAuth } from "../../contexts/AuthContext";
import AnimatedHeading from "../core/AnimatedHeading";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = credentials;
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    const success = login(email, password);
    if (success) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="font-inter flex justify-center items-center min-h-screen w-full px-4 bg-black bg-[radial-gradient(gray_6%,transparent_2%)] bg-[length:15px_15px] relative overflow-hidden">
      <div
        id="login-box"
        className="backdrop-blur-md bg-white/10  rounded-2xl p-8 w-full max-w-md text-white z-10 shadow-glass"
      >
        <AnimatedHeading text="Ship Maintenance" highlightText="Dashboard" />
        <p className="text-center text-sm text-white/70 mb-1">
          Login to continue
        </p>
        <h2 className="text-indigo-400 font-semibold text-xl mb-4 text-left">
          Welcome Back!
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-white/70 text-sm mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={credentials.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-white/30 text-white focus:outline-none focus:border-white/60"
            />
          </div>

          <div className="mb-1 relative">
            <label
              className="block text-white/70 text-sm mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-white/30 text-white focus:outline-none focus:border-white/60"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-white/60 hover:text-white/70"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <MdVisibilityOff size={20} />
              ) : (
                <MdVisibility size={20} />
              )}
            </button>
          </div>

          <div className="text-right text-xs mb-5">
            <a href="#" className="text-white/60 hover:underline">
              Forgot Password
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 mt-2 rounded-lg bg-yellow-300 text-slate-900 font-semibold hover:bg-yellow-400 transition disabled:opacity-60"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Login <BsArrowRightCircleFill size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
