export interface StudentProps {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  grade: number;
  verified: boolean;
}

export interface StudentCardProps {
  student: StudentProps;
  onView?: (studentId: string) => void;
  onEdit?: (studentId: string) => void;
  onDelete?: (studentId: string) => void;
}
