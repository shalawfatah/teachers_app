import { View } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { styles } from "@/styles/signup_styles";
import { TeacherShort } from "@/types/teacher";
import { TeacherDropdown } from "./teacher-dropdown";
import { GradeSelector } from "./grade-selector";

interface SignupFormProps {
  email: string;
  password: string;
  fullName: string;
  grade: string;
  selectedTeacherId: string | null;
  teachers: TeacherShort[];
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onFullNameChange: (name: string) => void;
  onGradeChange: (grade: string) => void;
  onTeacherSelect: (teacherId: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string;
}

export function SignupForm({
  email,
  password,
  fullName,
  grade,
  selectedTeacherId,
  teachers,
  onEmailChange,
  onPasswordChange,
  onFullNameChange,
  onGradeChange,
  onTeacherSelect,
  onSubmit,
  loading,
  error,
}: SignupFormProps) {
  return (
    <View>
      <TextInput
        label="Full Name"
        value={fullName}
        onChangeText={onFullNameChange}
        style={styles.input}
        mode="outlined"
        disabled={loading}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={onEmailChange}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        mode="outlined"
        disabled={loading}
      />

      <TeacherDropdown
        teachers={teachers}
        selectedTeacherId={selectedTeacherId}
        onSelect={onTeacherSelect}
        disabled={loading}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        disabled={loading}
      />

      <GradeSelector value={grade} onValueChange={onGradeChange} />

      {error ? <HelperText type="error">{error}</HelperText> : null}

      <Button
        mode="contained"
        onPress={onSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Sign Up
      </Button>
    </View>
  );
}
