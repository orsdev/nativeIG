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
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SignInNavigationProp, StackParamList } from "App";
import { useEffect, useState } from "react";
import { alertMessage } from "@/utils";
import { confirmSignUp } from "aws-amplify/auth";

const validationSchema = yup.object().shape({
  code: yup.string().required('Code is required'),
});

export interface IVerifyFormValues {
  code: string
}

type VerifyRouteProps = RouteProp<StackParamList, 'verify'>;

const VerifyScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const route = useRoute<VerifyRouteProps>()
  const navigation = useNavigation<SignInNavigationProp>()
  const { control, handleSubmit } = useForm<IVerifyFormValues>({
    defaultValues: {
      code: ''
    },
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    if (!route.params?.username) {
      navigation.goBack()
    }
  }, [])

  const onSubmit = async (values: IVerifyFormValues) => {
    setIsLoading(true)
    try {
      const { nextStep: confirmSignUpNextStep } = await confirmSignUp({
        username: route.params?.username,
        confirmationCode: values.code,
      });

      if (confirmSignUpNextStep.signUpStep === 'DONE') {
        alertMessage({
          style: 'default',
          title: 'Verification success',
          buttonText: 'Log in',
          message: 'Account verified.',
          handleContinue() {
            navigation.navigate('signIn')
          }
        })
      } else {
        throw new Error('Verification failed...')
      }

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

  const navigateToSignInScreen = () => {
    navigation.navigate('signIn')
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
          Verify
        </Text>
        <Text>
          Enter the verification code sent to you mail
        </Text>
        <View style={styles.inputContainer}>
          <TextBox
            name="code"
            label=""
            placeholder=""
            control={control}
          />
        </View>
        <PressableButton
          title={isLoading ? 'Loading...' : 'Verify code'}
          handlePress={handleSubmit(onSubmit)}
          isLoading={isLoading} />
        <View style={styles.footerContainer}>
          <Pressable onPress={navigateToSignInScreen}>
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

export default VerifyScreen