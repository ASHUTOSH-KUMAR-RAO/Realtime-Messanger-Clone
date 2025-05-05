'use client';

import axios from "axios";
import Input from "@/app/components/inputs/Input";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Varient = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Varient>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    setVariant(current => current === "LOGIN" ? "REGISTER" : "LOGIN");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      if (variant === "REGISTER") {
        await axios.post("/api/register", data);
        await signIn("credentials", data);
        toast.success("Account created successfully! 🎉");
      }

      if (variant === "LOGIN") {
        const callback = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (callback?.error) {
          throw new Error("Invalid credentials");
        }

        toast.success("Welcome back! 👋");
        router.push("/users");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const socialAction = async (action: string) => {
    setIsLoading(true);

    try {
      const callback = await signIn(action, { redirect: false });

      if (callback?.error) {
        throw new Error("Invalid credentials");
      }

      toast.success("Signed in successfully! 🚀");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl px-6 py-8 sm:px-10 border border-white/20 overflow-hidden relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 z-0" />
        
        <div className="relative z-10">
          {/* Form header with animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {variant === "LOGIN" ? "Welcome back!" : "Create account"}
            </h2>
            <p className="mt-2 text-gray-500">
              {variant === "LOGIN" 
                ? "Sign in to continue your conversation" 
                : "Join us to get started"}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {variant === "REGISTER" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  id="name"
                  label="Full Name"
                  register={register}
                  errors={errors}
                  required
                  disabled={isLoading}
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: variant === "REGISTER" ? 0.2 : 0 }}
            >
              <Input
                id="email"
                label="Email Address"
                type="email"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: variant === "REGISTER" ? 0.3 : 0.1 }}
            >
              <Input
                id="password"
                label="Password"
                type="password"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: variant === "REGISTER" ? 0.4 : 0.2 }}
            >
              <Button
                disabled={isLoading}
                fullWidth
                type="submit"
                loading={isLoading}
              >
                {variant === "LOGIN" ? "Sign In" : "Register"}
              </Button>
            </motion.div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative flex justify-center"
              >
                <span className="bg-white px-3 text-sm text-gray-500 font-medium cursor-default">
                  Or continue with
                </span>
              </motion.div>
            </div>

            <motion.div 
              className="mt-6 grid grid-cols-2 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => socialAction("github")}
                loading={isLoading}
              />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialAction("google")}
                loading={isLoading}
              />
            </motion.div>
          </div>

          <motion.div 
            className="flex justify-center gap-2 mt-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-gray-500">
              {variant === "LOGIN" 
                ? "New to Messenger?" 
                : "Already have an account?"}
            </span>
            <motion.button
              onClick={toggleVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              {variant === "LOGIN" ? "Create account" : "Sign in"}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthForm;