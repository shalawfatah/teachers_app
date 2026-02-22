import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export const useVideos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchVideos = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchVideos();
  };

  return { videos, loading, refreshing, onRefresh };
};
