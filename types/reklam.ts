export type ReklamLinkType = "course" | "video" | "document" | "external" | "none";

export interface Reklam {
  id: string;
  teacher_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null; // Bunny iframe embed (reference/fallback)
  video_bunny_id: string | null; // Bunny GUID → used to build HLS URL for expo-video
  link_type: ReklamLinkType;
  link_target: string | null; // course/video/document UUID or full external URL
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ReklamWithRelations extends Reklam {
  courses?: {
    id: string;
    title: string;
    thumbnail: string;
  };
  videos?: {
    id: string;
    title: string;
    thumbnail: string;
  };
}

export interface ReklamFormData {
  title: string;
  description?: string;
  image_url?: string;
  video_url?: string;
  link_type: ReklamLinkType;
  link_target?: string;
  display_order: number;
  is_active: boolean;
  background_color?: string;
  text_color?: string;
}

export interface ReklamCarouselProps {
  teacherId: string;
}
