import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { translations } from "@/utils/eng_krd";

type LanguageContextType = {
  lang: number;
  t: typeof translations;
  isRTL: boolean;
  setLanguage: (lang: number) => void;
  refreshLanguage: () => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<number>(1); // Default to English

  const isRTL = lang === 2;
  const t = translations;

  const refreshLanguage = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Try teachers first
        const { data: teacher } = await supabase
          .from("teachers")
          .select("lang")
          .eq("id", user.id)
          .maybeSingle();

        if (teacher) {
          setLang(teacher.lang || 1);
          return;
        }

        // If not a teacher, try students
        const { data: student } = await supabase
          .from("students")
          .select("lang")
          .eq("id", user.id)
          .maybeSingle();

        if (student) {
          setLang(student.lang || 1);
        }
      }
    } catch (error) {
      console.error("Error fetching language preference:", error);
    }
  };

  useEffect(() => {
    refreshLanguage();
  }, []);

  const setLanguage = (newLang: number) => {
    setLang(newLang);
  };

  return (
    <LanguageContext.Provider
      value={{ lang, t, isRTL, setLanguage, refreshLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
