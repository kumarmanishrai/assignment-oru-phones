"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dotenv from 'dotenv'
dotenv.config()


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false)
  const [loginSuccess, setLoginSuccces] = useState(false)
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setLoginSuccces(true)
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
      alert("Login failed, Try Again");
    }
  };

  useEffect(() => {
  if (loginSuccess) {
    router.push("/admin");
  }
}, [loginSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
  <form
    onSubmit={handleLogin}
    className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
  >
    {/* Logo/Header */}
    <div className="flex justify-center mb-6">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      </div>
    </div>

    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Portal</h1>
    
    {/* Email Field */}
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>
    </div>
    
    {/* Password Field */}
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>
    </div>
    
    {/* Admin Checkbox */}
    <div className="flex items-center mb-6">
      <input
        id="admin-checkbox"
        type="checkbox"
        checked={isAdmin}
        onChange={(e) => setIsAdmin(!isAdmin)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor="admin-checkbox" className="ml-2 block text-sm text-gray-700">
        Login as Administrator
      </label>
    </div>
    
    {/* Error Message */}
    {error && (
      <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {error}
      </div>
    )}
    
    {/* Submit Button */}
    <button
      type="submit"
      className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
      Log In
    </button>
    
    {/* Forgot Password Link */}
    <div className="mt-4 text-center">
      <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
        Forgot your password?
      </a>
    </div>
  </form>
</div>
  );
}
