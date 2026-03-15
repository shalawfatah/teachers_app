import { Teacher } from "./profile";

export type TeacherStats = {
  students_count: number;
  courses_count: number;
  videos_count: number;
};

export type TeacherShort = {
  id: string;
  name: string;
};

export interface TeacherHeroProps {
  profile: Teacher | null;
  stats: TeacherStats | null;
  onEdit: () => void;
  onSignOut: () => void;
  onLanguageChange?: () => void;
}
