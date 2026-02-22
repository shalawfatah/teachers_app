export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  order: number;
  duration: string;
  views: number;
  uploaded_at: string;
}

export interface VideosTabProps {
  onEdit: (video: any) => void;
  onDelete: (id: string) => void;
  onView: (video: any) => void;
}

export type VideoSingle = {
  id: string;
  title: string;
  free: boolean;
  thumbnail: string;
};

export interface VideoFormData {
  title: string;
  link: string;
  courseId: string;
  courseName: string;
}

export interface Course {
  id: string;
  title: string;
}
