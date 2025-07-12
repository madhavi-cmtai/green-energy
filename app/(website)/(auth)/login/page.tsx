"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Firebase client-side password authentication
      await signInWithEmailAndPassword(auth, email, password);

      // 2. Call backend to get user profile
      const res = await fetch("/api/routes/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      if (!res.ok || result.errorCode !== "NO") {
        throw new Error(result.errorMessage || "Login failed.");
      }

      // 3. Get user profile from backend via GET
      const profileRes = await fetch(`/api/routes/auth?email=${encodeURIComponent(email)}`);
      const profileData = await profileRes.json();

      if (!profileRes.ok || !profileData.data) {
        throw new Error("User profile not found.");
      }

      const user = profileData.data;

      // Store in localStorage + cookie
      localStorage.setItem("user", JSON.stringify(user));
      document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/`;

      // Redirect to dashboard after login
      if (user.role === "admin") {
        router.replace("/dashboard");
      } else {
        setError("Access denied. Only admins can login.");
        // Optionally: logout or clear localStorage
        localStorage.removeItem("user");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Image */}
      <div className="w-full md:w-1/2 hidden md:flex items-center justify-center relative">
        <img
          src="/images/login.jpg"
          alt="Login"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-6">Please login to continue</p>
          <button
            onClick={() => router.push("/signup")}
            className="bg-white text-[var(--primary-green)] font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-green-50 px-6 py-12">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
          <h2 className="text-2xl font-bold text-[var(--primary-green)]">Login</h2>

          <div>
            <label className="block text-sm font-medium text-green-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-green)]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-green)]"
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary-green)] hover:bg-[var(--primary-light-green)] text-white font-semibold py-2 rounded-lg transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
