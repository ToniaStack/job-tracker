import { useState } from "react";
import { Briefcase, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { loginUser } from "../utils/api";

export default function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("jobtrack_token", data.token);
      localStorage.setItem("jobtrack_user", JSON.stringify(data.user));

      onLogin(data.user);
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-main flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-purple flex items-center justify-center mb-4 shadow-sm shadow-primary-purple/30">
            <Briefcase className="text-white" size={28} />
          </div>

          <h1 className="text-3xl font-extrabold text-text-primary">
            Welcome back
          </h1>

          <p className="text-text-secondary mt-2">
            Sign in to continue managing your opportunities.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface-card border border-border-main rounded-2xl p-6 sm:p-8 shadow-sm space-y-5"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Email
            </label>

            <div className="relative">
              <Mail
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-border-main bg-surface-card text-text-primary text-sm outline-none focus:border-primary-purple"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Password
            </label>

            <div className="relative">
              <Lock
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border-main bg-surface-card text-text-primary text-sm outline-none focus:border-primary-purple"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-0.5 focus:outline-none"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary-purple hover:bg-deep-purple text-white text-sm font-semibold transition-colors disabled:opacity-60 shadow-sm shadow-primary-purple/30"
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <ArrowRight size={17} />}
          </button>

          <p className="text-center text-sm text-text-secondary">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="font-semibold text-primary-purple hover:text-deep-purple hover:underline"
            >
              Create one
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}