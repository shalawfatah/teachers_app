export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video_count: number;
  grade: string;
  subject: string;
}
