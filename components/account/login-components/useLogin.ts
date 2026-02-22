import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const { data: authData, error: loginError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (loginError) throw loginError;
      const user = authData?.user;
      if (!user) throw new Error("No user found");

      // Check Teacher Role
      const { data: teacher } = await supabase
        .from("teachers")
        .select("id")
        .eq("id", user.id)
        .single();
      if (teacher) return router.replace("/(teacher)");

      // Check Student Role
      const { data: student } = await supabase
        .from("students")
        .select("id")
        .eq("id", user.id)
        .single();
      if (student) return router.replace("/(student)");

      setError("User record not found in database.");
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
}
