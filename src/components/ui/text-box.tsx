import { Sizes, ThemeColor } from "@/constants";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { KeyboardTypeOptions, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather'

interface ITextBox<T extends FieldValues> {
  name: Path<T>;
  label: string;
  multiline?: boolean,
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions | undefined
  isSecure?: boolean;
  control: Control<T>
}

const TextBox = <T extends FieldValues>({ label,
  name,
  isSecure = false,
  multiline = false,
  keyboardType = 'default',
  control,
  placeholder = '' }: ITextBox<T>) => {

  const [isSecureText, setIsSecureText] = useState(isSecure);

  const handleToggleVisibility = () => {
    setIsSecureText(s => !s)
  };

  return (
    <Controller
      control={control}
      render={({ fieldState: { error }, field: { onChange, onBlur, value } }) => (
        <View style={styles.root}>
          <View style={styles.wrapper}>
            {label && (
              <Text style={styles.label}>{label}</Text>
            )}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, error?.message ? styles.inputError : {}]}
                placeholder={placeholder}
                onBlur={onBlur}
                autoCapitalize="none"
                keyboardType={keyboardType}
                secureTextEntry={isSecureText}
                autoCorrect={false}
                autoComplete="off"
                onChangeText={onChange}
                multiline={multiline}
                value={value}
              />
              {isSecure && (
                <Pressable style={styles.iconButton} onPress={handleToggleVisibility}>
                  <FeatherIcon name={isSecureText ? 'eye-off' : 'eye'} size={16} />
                </Pressable>
              )}
            </View>
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
    fontSize: Sizes.xs,
    marginTop: 6
  },
  inputContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  iconButton: {
    position: 'absolute',
    right: 10
  },
  wrapper: {
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