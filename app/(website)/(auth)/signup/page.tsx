"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/redux/features/authSlice";
import { store } from "@/lib/redux/store";

const SignupPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setLoading(true);

    await store.dispatch(registerUser({ email, password, name }) as any);
    const state = store.getState().auth;

    if (state.error) {
      setLocalError(state.error);
    } else {
      router.replace("/login");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side */}
      <div className="w-full md:w-1/2 hidden md:flex items-center justify-center relative">
        <img
          src="/images/login.jpg"
          alt="Signup"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Join Us!</h1>
          <p className="text-lg mb-6">Create your account to get started</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-white text-[var(--primary-green)] font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-green-50 px-6 py-12">
        <form onSubmit={handleSignup} className="w-full max-w-sm space-y-6">
          <h2 className="text-2xl font-bold text-[var(--primary-green)]">Sign Up</h2>

          <div>
            <label className="block text-sm font-medium text-green-600 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-green)]"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-green)]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-green)]"
              placeholder="Password"
              required
            />
          </div>

          {localError && <p className="text-sm text-red-600 text-center">{localError}</p>}

          <button
            type="submit"
            className="w-full bg-[var(--primary-green)] hover:bg-[var(--primary-light-green)] text-white font-semibold py-2 rounded-lg transition-all"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
