import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { VideoSingle } from "@/types/videos";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function useCourseData(courseId: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [videos, setVideos] = useState<VideoSingle[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }

  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);

      // Check verification status
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: studentData } = await supabase
          .from("students")
          .select("verified")
          .eq("id", user.id)
          .single();
        setIsVerified(studentData?.verified || false);
      }

      // Fetch course
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();
      if (courseError) throw courseError;
      setCourse(courseData);

      // Fetch videos
      const { data: videosData, error: videosError } = await supabase
        .from("videos")
        .select("id, title, free, thumbnail")
        .eq("course_id", courseId)
        .order("created_at", { ascending: true });
      if (videosError) throw videosError;
      setVideos(videosData || []);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  const canPlayVideo = (video: VideoSingle) => {
    return video.free || isVerified;
  };

  return { course, videos, isVerified, loading, canPlayVideo };
}
