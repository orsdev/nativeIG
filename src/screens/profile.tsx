import AvatarHeader from "@/components/profile/avatar-header"
import ProfileBio from "@/components/profile/bio"
import ProfilePosts from "@/components/profile/profile-posts"
import ProfileTab from "@/components/profile/profile-tab"
import { ProfileData } from "@/constants"
import { ProfileStackParamList } from "@/navigation/ProfileStack"
import { useAuthStore } from "@/store"
import { RouteProp, useRoute } from "@react-navigation/native"
import { useMemo } from "react"
import { FlatList, StyleSheet, View } from "react-native"

export type ProfileRouteProps = RouteProp<ProfileStackParamList, 'profileScreen'>;

const ProfileScreen = () => {
  const route = useRoute<ProfileRouteProps>();
  const params = route.params;
  const { user } = useAuthStore()

  const userInfo = useMemo(() => {
    if (params?.userId) {
      return {
        name: ProfileData.name,
        username: ProfileData.username,
        bio: ProfileData.bio
      }
    } else {
      return {
        name: user?.name ?? '',
        username: user?.username ?? '',
        bio: ''
      }
    }
  }, [params])

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
            <ProfileBio
              name={userInfo.name}
              userName={userInfo.username}
              about={userInfo.bio} />
            <ProfileTab userId={params?.userId} />
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