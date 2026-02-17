export type ReklamLinkType =
  | "course"
  | "video"
  | "document"
  | "external"
  | "none";

export interface Reklam {
  id: string;
  teacher_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  video_hls_url: string | null;
  link_type: ReklamLinkType;
  link_target: string | null;
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
