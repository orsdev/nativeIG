import { ThemeColor } from "@/constants";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface ITextBox<T extends FieldValues> {
  name: Path<T>;
  label: string;
  multiline?: boolean,
  placeholder?: string;
  control: Control<T>
}

const TextBox = <T extends FieldValues>({ label, name, multiline = false, control, placeholder = '' }: ITextBox<T>) => {
  return (
    <Controller
      control={control}
      render={({ fieldState: { error }, field: { onChange, onBlur, value } }) => (
        <View style={styles.root}>
          <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={[styles.input, error?.message ? styles.inputError : {}]}
              placeholder={placeholder}
              onBlur={onBlur}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              onChangeText={onChange}
              multiline={multiline}
              value={value}
            />
          </View>
          {error?.message && (
            <Text style={styles.errorMessage}>{error?.message}</Text>
          )}
        </View>
      )}
      name={name}
    />
  )
}

const styles = StyleSheet.create({
  root: {},
  errorMessage: {
    color: 'red',
    marginLeft: 85,
    fontSize: 12,
    marginTop: 4
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  label: {
    width: 75
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: ThemeColor.border,
    color: ThemeColor.grey,
    minHeight: 40
  },
  inputError: {
    borderColor: 'red'
  }
})



export default TextBox