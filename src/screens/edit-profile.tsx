import TextBox from "@/components/ui/text-box"
import { ThemeColor, UserProfile } from "@/constants"
import { IUser } from "@/interfaces/profile.interface";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Image, StyleSheet, Text, View } from "react-native"
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = object().shape({
  name: string().required('Field is required'),
  username: string().required('Field is required'),
  bio: string(),
  website: string().url('Invalid website url'),
})



const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Asset | null>(null)
  const data = UserProfile[0];
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Omit<IUser, 'id'>>({
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

  return (
    <View style={styles.root}>
      <Image source={{ uri: selectedPhoto?.uri || UserProfile[0].image }} style={styles.avatar} />
      <Text style={styles.textButton} onPress={onChangePhoto}> Change profile photo </Text>
      <View style={{ gap: 10, width: '100%' }}>
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
