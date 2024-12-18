import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable
} from "react-native"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"
import TextBox from "@/components/ui/text-box";
import { PressableButton } from "@/components/ui";
import { Sizes, ThemeColor } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp, SignUpNavigationProp } from "App";
import { useState } from "react";
import { alertMessage } from "@/utils";
import { signIn } from "aws-amplify/auth";
import { useAuthStore } from "@/store";

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

export interface ILoginFormValues {
  password: string;
  username: string;
}


const SignInScreen = () => {
  const { handleSetIsSignedIn } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<SignUpNavigationProp | HomeNavigationProp>()
  const { control, handleSubmit } = useForm<ILoginFormValues>({
    defaultValues: {
      username: 'samoogbe',
      password: 'Samuel123@'
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (values: ILoginFormValues) => {
    setIsLoading(true)
    try {
      const { isSignedIn } = await signIn({
        username: values.username,
        password: values.password
      });
      handleSetIsSignedIn(isSignedIn)
    } catch (e: any) {
      alertMessage({
        style: 'destructive',
        title: 'Error',
        buttonText: 'Close',
        message: e?.message ?? 'Something went wrong'
      })
    } finally {
      setIsLoading(false)
    }
  };

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 0;

  const navigateToSignupScreen = () => {
    navigation.navigate('signUp')
  }

  return (

    <KeyboardAvoidingView
      style={styles.root}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={styles.root}>
        <View style={styles.logoContainer}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.heading}>
          Hi
        </Text>
        <Text>
          Enter your username and password to log in
        </Text>
        <View style={styles.inputContainer}>
          <TextBox
            name="username"
            label="Username"
            placeholder="@username"
            control={control}
          />
          <TextBox
            name="password"
            label="Password"
            isSecure={true}
            control={control}
          />
        </View>
        <PressableButton
          title={isLoading ? 'Loading...' : 'Log in'}
          handlePress={handleSubmit(onSubmit)}
          isLoading={isLoading} />
        <View style={styles.footerContainer}>
          <Pressable>
            <Text style={{ color: ThemeColor.black }}>Forgot password?</Text>
          </Pressable>
          <Pressable onPress={navigateToSignupScreen}>
            <Text style={{ color: ThemeColor.secondary }}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    marginTop: 30
  },
  heading: {
    fontSize: Sizes.xl,
    fontWeight: '700'
  },
  inputContainer: {
    marginVertical: 30,
    marginBottom: 20,
    gap: 20
  },
  input: {
    backgroundColor: ThemeColor.grey,
    borderRadius: 8,
    padding: 20,
    fontSize: 17,
    marginRight: 10
  },
  enabled: {
    backgroundColor: ThemeColor.primary
  },
  disabled: {
    backgroundColor: ThemeColor.grey,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  logo: {
    width: 40,
    height: 60,
    objectFit: 'contain'
  },
  footerContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default SignInScreen