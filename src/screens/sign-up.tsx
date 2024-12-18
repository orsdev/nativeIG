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
import { useState } from "react";
import { signUp } from "aws-amplify/auth"
import { useNavigation } from "@react-navigation/native";
import { SignInNavigationProp, VerifyNavigationProp } from "App";
import { alertMessage } from "@/utils";

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  fullName: yup.string().required('Name is required'),
  phone: yup.string().required('Phone is required'),
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required')
});

export interface ISignupFormValues {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  username: string;
}


const SignUpScreen = () => {
  const navigation = useNavigation<SignInNavigationProp | VerifyNavigationProp>()
  const [isLoading, setIsLoading] = useState(false)
  const { control, handleSubmit } = useForm<ISignupFormValues>({
    defaultValues: {
      username: 'samoogbe',
      email: 'oluwadareysamuel@gmail.com',
      password: 'Samuel123@',
      fullName: 'Ogundare Samuel',
      phone: '+2348144436943'
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (values: ISignupFormValues) => {
    setIsLoading(true)
    try {
      await signUp({
        username: values.username,
        password: values.password,
        options: {
          userAttributes: {
            email: values.email,
            name: values.fullName,
            phone_number: values.phone// E.164 number convention
          },
        }
      });
      navigation.navigate('verify', {
        username: values.username
      })
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


  const navigateToSigninScreen = () => {
    navigation.navigate('signIn')
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 0;


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
          Sign Up
        </Text>
        <Text>
          Please enter your details
        </Text>
        <View style={styles.inputContainer}>
          <TextBox
            name="username"
            label="Username"
            placeholder="@username"
            control={control}
          />
          <TextBox
            name="fullName"
            label="Full name"
            placeholder=""
            control={control}
          />
          <TextBox
            keyboardType="email-address"
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            control={control}
          />
          <TextBox
            keyboardType="phone-pad"
            name="phone"
            label="Phone"
            placeholder="eg. +2340833444545"
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
          title={isLoading ? 'Loading...' : 'Sign up'}
          handlePress={handleSubmit(onSubmit)}
          isLoading={isLoading} />

        <View style={styles.footerContainer}>
          <Pressable onPress={navigateToSigninScreen}>
            <Text style={{ color: ThemeColor.secondary }}>Sign in</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default SignUpScreen