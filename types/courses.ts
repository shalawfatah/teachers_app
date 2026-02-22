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
export interface ExtendedCourse {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  grade: number;
  subject: string;
  // Add these joined fields:
  teachers: {
    name: string;
  } | null;
  videos: {
    id: string;
    title: string;
    duration?: string;
  }[];
}
export interface SingleCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  grade: string;
}

export interface CoursesTabProps {
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export interface CourseFormData {
  title: string;
  description: string;
  grade: string;
  subject: string;
  thumbnail: string;
}

export interface EditCourseFormProps {
  formData: CourseFormData;
  onFieldChange: (field: keyof CourseFormData, value: string) => void;
  error: string;
  disabled: boolean;
}

export interface EditCourseFormChangeProps {
  formData: {
    title: string;
    description: string;
    grade: string;
    subject: string;
    thumbnail: string;
  };
  onFieldChange: (field: string, value: string) => void;
  error: string;
  disabled: boolean;
}

export interface GradeSelectorProps {
  value: string;
  onValueChange: (grade: string) => void;
}

export interface SubjectDropdownProps {
  value: string;
  onSelect: (subject: string) => void;
  disabled?: boolean;
}
