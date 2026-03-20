import { View } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { styles } from "@/styles/signup_styles";
import { TeacherShort } from "@/types/teacher";
import GradeSelector from "./grade-selector";
import TeacherDropdown from "./teacher-dropdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

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
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <View>
      <TextInput
        label={text.name}
        value={fullName}
        onChangeText={onFullNameChange}
        style={styles.input}
        mode="outlined"
        disabled={loading}
      />
      <TextInput
        label={text.phone} // add text.phone to your translations
        value={phone}
        onChangeText={onPhoneChange}
        keyboardType="phone-pad"
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
        label={text.password}
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
        {text.create_account}
      </Button>
    </View>
  );
}
