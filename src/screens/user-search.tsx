import UserListItem from "@/components/user-search/user-list-item"
import { UserProfile } from "@/constants"
import { FlatList, StyleSheet, Text, View } from "react-native"

const UserSearchScreen = () => {
  return (
    <FlatList
      style={styles.root}
      data={UserProfile}
      renderItem={({ item }) => {
        return (
        <UserListItem user={item} />
        )
      }} />
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10
  }
})

export default UserSearchScreen