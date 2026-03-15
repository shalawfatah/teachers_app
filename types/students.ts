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

export interface AuxProps {
  icon: string;
  label: string;
  value: string;
}

export interface StudentHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface StudentInfoProps {
  student: {
    name: string;
    email: string;
    grade?: string | number;
  };
}
