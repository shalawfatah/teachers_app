import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

interface SignupParams {
  email: string;
  password: string;
  fullName: string;
  grade: string;
  teacherId: string | null;
}

type SignupResult = "success" | "email_verification_required" | "error";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signup = async ({
    email,
    password,
    fullName,
    grade,
    teacherId,
  }: SignupParams): Promise<SignupResult> => {
    setError("");

    // Validation
    if (!fullName.trim()) {
      setError("Please enter your full name");
      return "error";
    }
    if (!email.trim()) {
      setError("Please enter your email");
      return "error";
    }
    if (!teacherId) {
      setError("Please select your teacher");
      return "error";
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return "error";
    }

    setLoading(true);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: {
              name: fullName,
              grade,
              teacher_id: teacherId,
            },
          },
        },
      );

      if (signUpError) {
        setError(signUpError.message);
        return "error";
      }

      if (authData.session) {
        router.replace("/(student)");
        return "success";
      } else {
        return "email_verification_required";
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An unexpected error occurred.");
      return "error";
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, signup };
}
