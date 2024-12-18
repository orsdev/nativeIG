import TextBox from "@/components/ui/text-box"
import { ThemeColor, UserProfile } from "@/constants"
import { IUser } from "@/interfaces/profile.interface";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native"
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { alertMessage } from "@/utils";
import { useAuthStore } from "@/store";

const validationSchema = object().shape({
  name: string().required('Field is required'),
  username: string().required('Field is required'),
  bio: string(),
  website: string().url('Invalid website url'),
})


const EditProfileScreen = () => {
  const {handleLogOut} = useAuthStore()
  const [selectedPhoto, setSelectedPhoto] = useState<Asset | null>(null)
  const data = UserProfile[0];
  const { control, handleSubmit,  formState: { errors } } = useForm<Omit<IUser, 'id'>>({
    defaultValues: {
      name: data?.name ?? '',
      username: data?.username ?? '',
      website: '',
      bio: data?.bio ?? ''
    },
    resolver: yupResolver(validationSchema)
  });

  const onChangePhoto = async () => {
    await launchImageLibrary({
      mediaType: 'photo'
    }, ({ didCancel, errorCode, errorMessage, assets }) => {
      if (!didCancel || !errorMessage) {
        if (assets && assets.length > 0) {
          setSelectedPhoto(assets[0])
        }
      }
    });
  }


  const onSubmit = (values: Omit<IUser, 'id'>) => {
    console.log(values)
  };

  const handleLogout = async () => {
    try {
      await handleLogOut();
    } catch (_) {
      alertMessage({
        title: 'Error',
        message: 'Can"t log out at this time. Try again',
        buttonText: 'Close'
      })
    }

  };

  return (
    <View style={styles.root}>
      <Image source={{ uri: selectedPhoto?.uri || UserProfile[0].image }} style={styles.avatar} />
      <Text style={styles.textButton} onPress={onChangePhoto}> Change profile photo </Text>
      <Pressable onPress={handleLogout} style={styles.logOutButton}>
        <Text style={{color: ThemeColor.white}}>Log out</Text>
      </Pressable>
      <View style={{ gap: 30, width: '100%', marginTop: 40 }}>
        <TextBox
          name="name"
          label="Name"
          control={control}
        />
        <TextBox
          name="username"
          label="Username"
          control={control}
        />
        <TextBox
          name="website"
          label="Website"
          placeholder="https://example.com"
          control={control}
        />
        <TextBox
          name="bio"
          label="Bio"
          multiline={true}
          control={control}
        />
      </View>
      <View style={{
        marginTop: 20
      }} />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 10
  },
  logOutButton: {
   borderWidth: 1,
   borderColor: ThemeColor.grey,
   paddingHorizontal: 4,
   paddingVertical: 2,
   borderRadius: 2,
   backgroundColor: ThemeColor.grey
  },
  avatar: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 100
  },
  textButtonDanger: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600'
  },
  textButton: {
    color: ThemeColor.primary,
    fontSize: 16,
    fontWeight: '600',
    margin: 10
  }
})

export default EditProfileScreen
