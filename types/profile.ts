export interface Teacher {
  id: string;
  name: string;
  email: string;
  expertise: string | null;
  thumbnail: string;
  cover_img: string;
  lang: number;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  lang: number;
  grade: string;
  verified: boolean;
  teacher_id: string;
  created_at: string;
  updated_at: string;
  teachers?: Teacher;
}

export interface UpdateProfileParams {
  name: string;
  expertise: string;
  thumbnail: string | null;
  coverImg: string | null;
}
