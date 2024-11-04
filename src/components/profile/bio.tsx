import { ThemeColor } from "@/constants";
import { Text } from "react-native"
import { StyleSheet, View } from "react-native"

const ProfileBio = ({ name, about }: { name: string; about: string }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.about}>{about}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: 4
  },
  name: {
    fontWeight: '600'
  },
  about: {
    color: ThemeColor.grey
  }
})

export default ProfileBio
