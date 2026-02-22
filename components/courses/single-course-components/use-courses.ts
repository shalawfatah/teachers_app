import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { FilterState } from "@/types/modal";

export default function useCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ grades: [] });

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("courses")
        .select("*, teachers (name)")
        .order("created_at", { ascending: false });

      if (filters.grades.length > 0) {
        query = query.in("grade", filters.grades);
      }

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filters, searchQuery]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCourses();
  };

  return {
    courses,
    loading,
    refreshing,
    onRefresh,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filterVisible,
    setFilterVisible,
  };
}
