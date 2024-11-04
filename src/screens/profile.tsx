import AvatarHeader from "@/components/profile/avatar-header"
import ProfileBio from "@/components/profile/bio"
import ProfilePosts from "@/components/profile/profile-posts"
import ProfileTab from "@/components/profile/profile-tab"
import { ProfileData } from "@/constants"
import { FlatList, StyleSheet, View } from "react-native"

const ProfileScreen = () => {
  return (
    <View style={styles.root}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={{
            padding: 10
          }}>
            <AvatarHeader
              image={ProfileData.image}
              totalFollowers={100}
              totalFollowing={200}
              totalPosts={5}
            />
            <ProfileBio name={ProfileData.username} about={ProfileData.bio} />
            <ProfileTab />
          </View>
        )}
        keyExtractor={item => item.id}
        data={ProfileData.posts}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        contentContainerStyle={{
          gap: 3
        }}
        columnWrapperStyle={{
          gap: 3
        }}
        renderItem={({ item }) => (
          <ProfilePosts post={item} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
    gap: 10
  }
})


export default ProfileScreen