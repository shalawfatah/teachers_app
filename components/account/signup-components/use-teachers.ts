import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { TeacherShort } from "@/types/teacher";

export default function useTeachers() {
  const [teachers, setTeachers] = useState<TeacherShort[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("teachers")
        .select("id, name")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching teachers:", error);
      } else {
        setTeachers(data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  return { teachers, loading, refetch: fetchTeachers };
}
