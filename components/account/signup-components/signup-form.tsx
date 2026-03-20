import { View } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { styles } from "@/styles/signup_styles";
import { TeacherShort } from "@/types/teacher";
import TeacherDropdown from "./teacher-dropdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import GradeDropdown from "@/components/courses/filter-modal-components/GradeSelector";

interface SignupFormProps {
  phone: string;
  password: string;
  fullName: string;
  grade: string;
  selectedTeacherId: string | null;
  teachers: TeacherShort[];
  onPhoneChange: (phone: string) => void;
  onPasswordChange: (password: string) => void;
  onFullNameChange: (name: string) => void;
  onGradeChange: (grade: string) => void;
  onTeacherSelect: (teacherId: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string;
}

export default function SignupForm({
  phone,
  password,
  fullName,
  grade,
  selectedTeacherId,
  teachers,
  onPhoneChange,
  onPasswordChange,
  onFullNameChange,
  onGradeChange,
  onTeacherSelect,
  onSubmit,
  loading,
  error,
}: SignupFormProps) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <View>
      <TextInput
        placeholder={text.name}
        value={fullName}
        onChangeText={onFullNameChange}
        style={styles.input}
        contentStyle={{ textAlign: isRTL ? "right" : "left" }}
        mode="outlined"
        disabled={loading}
      />
      <TextInput
        placeholder={text.phone}
        value={phone}
        onChangeText={onPhoneChange}
        keyboardType="phone-pad"
        style={[styles.input, { textAlign: isRTL ? "right" : "left" }]}
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
        placeholder={text.password}
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry
        style={styles.input}
        contentStyle={{ textAlign: isRTL ? "right" : "left" }}
        mode="outlined"
        disabled={loading}
      />
      <GradeDropdown
        value={grade}
        onValueChange={onGradeChange}
        disabled={loading}
      />
      {error ? <HelperText type="error">{error}</HelperText> : null}
      <Button
        mode="contained"
        onPress={onSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        {text.create_account}
      </Button>
    </View>
  );
}
