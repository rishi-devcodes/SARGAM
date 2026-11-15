
"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({
  open,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const supabase = createClient();

  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const resetMessages = () => {
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      if (mode === "signup") {
        if (password.length < 6) {
          setError("Password must contain at least 6 characters.");
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) throw error;

        if (data.session) {
          onSuccess();
        } else {
          setMessage(
            "Account created! Please check your email and click the verification link before logging in."
          );
        }
      }

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        onSuccess();
      }

      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/`,
        });

        if (error) throw error;

        setMessage("Password reset link has been sent to your email.");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#11101b] p-7 shadow-2xl shadow-purple-950/30">

        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-xl text-gray-400 transition hover:text-white"
          aria-label="Close"
        >
          ×
        </button>

        <div className="mb-7 text-center">
          <h2 className="text-3xl font-bold tracking-widest text-white">
            SARGAM<span className="text-purple-400">.</span>
          </h2>

          <p className="mt-3 text-sm text-gray-400">
            {mode === "login"
              ? "Welcome back. Sign in to your account."
              : mode === "signup"
              ? "Create your account and make it personal."
              : "We'll send you a password reset link."}
          </p>
        </div>

        {mode !== "forgot" && (
          <div className="mb-6 grid grid-cols-2 rounded-xl bg-white/5 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                resetMessages();
              }}
              className={`rounded-lg py-2.5 text-sm font-medium transition ${
                mode === "login"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("signup");
                resetMessages();
              }}
              className={`rounded-lg py-2.5 text-sm font-medium transition ${
                mode === "signup"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500"
            />
          </div>

          {mode !== "forgot" && (
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-16 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-purple-300 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          )}

          {mode === "login" && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  setMode("forgot");
                  resetMessages();
                }}
                className="text-sm text-purple-300 hover:text-purple-200"
              >
                Forgot password?
              </button>
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          {message && (
            <p className="rounded-lg bg-green-500/10 p-3 text-sm text-green-400">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-3.5 font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : mode === "signup"
              ? "Create Account"
              : "Send Reset Link"}
          </button>
        </form>

        {mode === "forgot" && (
          <button
            type="button"
            onClick={() => {
              setMode("login");
              resetMessages();
            }}
            className="mt-5 w-full text-center text-sm text-gray-400 hover:text-white"
          >
            Back to Login
          </button>
        )}

        <p className="mt-7 text-center text-xs text-gray-500">
          Your music. Your space. Your SARGAM.
        </p>
      </div>
    </div>
  );
}
