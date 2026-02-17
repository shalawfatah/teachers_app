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
  video_url: string | null; // Bunny iframe embed (reference/fallback)
  video_hls_url: string | null; // Full HLS URL: https://vz-600296.b-cdn.net/{guid}/playlist.m3u8
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
