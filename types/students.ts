export interface StudentProps {
  id: string;
  name: string;
  email: string;
  enrolled_courses: number;
  last_active: string;
  status: "active" | "inactive";
}

export interface StudentCardProps {
  student: StudentProps;
  onView?: (studentId: string) => void;
  onEdit?: (studentId: string) => void;
  onDelete?: (studentId: string) => void;
}
