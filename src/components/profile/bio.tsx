import { ThemeColor } from "@/constants";
import { Text } from "react-native"
import { StyleSheet, View } from "react-native"

const ProfileBio = ({ name, userName, about }: { name: string; userName: string; about: string }) => {

  return (
    <View style={styles.root}>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.fullName}>{name}</Text>
      <Text style={styles.about}>{about}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: 4
  },
  userName: {
    fontWeight: '600'
  },
  fullName: {
    opacity: .8
  },
  about: {
    color: ThemeColor.grey
  }
})

export default ProfileBio
