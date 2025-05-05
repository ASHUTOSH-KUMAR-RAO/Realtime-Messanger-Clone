'use client';

import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { useState, useEffect } from "react";

const Page = () => {
  const [greeting, setGreeting] = useState("Welcome back!");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good morning!");
    else if (hours < 17) setGreeting("Good afternoon!");
    else setGreeting("Good evening!");
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 px-4 sm:px-6 lg:px-8 py-12 transition-all duration-700">
      
      {/* Parallax-style background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-purple-300 opacity-30 blur-3xl rounded-full animate-pulse translate-x-[-30%] translate-y-[-20%]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 opacity-30 blur-3xl rounded-full animate-ping translate-x-[20%] translate-y-[30%]" />
      </div>

      {/* Card container */}
      <div
        className={`relative z-10 sm:mx-auto sm:w-full sm:max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8 transform transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 blur group-hover:opacity-80 transition duration-300"></div>
            <Image
              src="/images/logo.png"
              alt="Logo"
              height="64"
              width="64"
              className="relative z-10 mx-auto w-auto rounded-full transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
          </div>
        </div>

        {/* Greetings */}
        <h2 className="mt-6 text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
          {greeting}
        </h2>
        <h3 className="mt-2 text-center text-2xl font-bold text-gray-900">
          Sign In to Your Messenger
        </h3>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access your account securely
          <span className="ml-1 inline-block animate-bounce">👇</span>
        </p>

        {/* Form */}
        <div className="mt-8">
          <AuthForm />
        </div>

        {/* Forgot password */}
        <div className="mt-6 flex items-center justify-center">
          <div className="text-sm">
            <button className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md px-2 py-1 transition-all duration-200">
              Forgot your password?
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-10 text-center">
        <p className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300 cursor-pointer">
          Need help? Contact support
        </p>
        <p className="mt-4 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-300">
          &copy; {new Date().getFullYear()} Ashutosh Kumar Rao. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Page;
