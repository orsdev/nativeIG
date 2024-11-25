import { ThemeColor } from "@/constants"
import { ProfileTabEnum } from "@/interfaces/profile.interface"
import { EditProfileNavigationProp } from "@/navigation/ProfileStack";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const tabData = [
  {
    label: 'Edit Profile',
    value: ProfileTabEnum.EditProfile,
    isDisabled: false
  },
  {
    label: 'Share Profile',
    value: ProfileTabEnum.ShareProfile,
    isDisabled: true,
  }
]

const ProfileTab = ({userId}: {userId?: string}) => {
  const navigation = useNavigation<EditProfileNavigationProp>();

  const navigateToEditProfile = () => {
    navigation.navigate('editProfileScreen', {
      userId: userId as string
    })
  }
  return (
    <View style={styles.root}>
      {tabData.map(tab => (
        <Pressable
          key={tab.value}
          style={[styles.buttonDefault, tab.isDisabled ? styles.buttonDisabled : {}]}
          disabled={tab.isDisabled}
          onPress={navigateToEditProfile}>
          {tab.isDisabled && (
            <Icon name="cancel" size={25} style={{ position: 'absolute', opacity: .3, zIndex: 1 }} />
          )}
          <Text style={[styles.textDefault, tab.isDisabled ? styles.textDisabled : {}]}>{tab.label}</Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-around',
    marginTop: 20
  },
  buttonDefault: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ThemeColor.lightGrey02,
    flex: 1,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: ThemeColor.lightGrey02
  },
  buttonDisabled: {
    opacity: .6
  },
  textDefault: {
    textAlign: 'center',
  },
  textDisabled: {
    position: 'relative',
    zIndex: 2,
    opacity: .8
  },
})

export default ProfileTab