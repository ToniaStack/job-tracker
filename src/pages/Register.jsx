import { useState } from "react";
import { Briefcase, User, Mail, Lock, Building, ArrowRight, Eye, EyeOff } from "lucide-react";
import { registerUser } from "../utils/api";

export default function Register({ onRegister, onSwitchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "job_seeker",
    companyName: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.role === "job_giver" && !form.companyName.trim()) {
      setError("Please provide your company or organization name.");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser(form);

      localStorage.setItem("jobtrack_token", data.token);
      localStorage.setItem("jobtrack_user", JSON.stringify(data.user));

      onRegister(data.user);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-main flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-7">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-purple flex items-center justify-center mb-4 shadow-sm shadow-primary-purple/30">
            <Briefcase className="text-white" size={28} />
          </div>

          <h1 className="text-3xl font-extrabold text-text-primary">
            Create your account
          </h1>

          <p className="text-text-secondary mt-2">
            Start managing your opportunities with JobTrack.
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
              Full Name
            </label>

            <div className="relative">
              <User
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />

              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Your full name"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-border-main text-sm outline-none focus:border-primary-purple bg-surface-card text-text-primary"
              />
            </div>
          </div>

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
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-border-main text-sm outline-none focus:border-primary-purple bg-surface-card text-text-primary"
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
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border-main text-sm outline-none focus:border-primary-purple bg-surface-card text-text-primary"
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

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              I am signing up as
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleChange("role", "job_seeker")}
                className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                  form.role === "job_seeker"
                    ? "border-primary-purple bg-soft-purple-bg text-deep-purple shadow-sm"
                    : "border-border-main text-text-secondary hover:border-text-muted"
                }`}
              >
                Job Seeker
              </button>

              <button
                type="button"
                onClick={() => handleChange("role", "job_giver")}
                className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                  form.role === "job_giver"
                    ? "border-primary-purple bg-soft-purple-bg text-deep-purple shadow-sm"
                    : "border-border-main text-text-secondary hover:border-text-muted"
                }`}
              >
                Job Giver
              </button>
            </div>
          </div>

          {form.role === "job_giver" && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Company / Organization
              </label>

              <div className="relative">
                <Building
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />

                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  placeholder="Acme Inc."
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-border-main text-sm outline-none focus:border-primary-purple bg-surface-card text-text-primary"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary-purple hover:bg-deep-purple text-white text-sm font-semibold transition-colors disabled:opacity-60 shadow-sm shadow-primary-purple/30"
          >
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <ArrowRight size={17} />}
          </button>

          <p className="text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-semibold text-primary-purple hover:text-deep-purple hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}