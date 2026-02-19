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
