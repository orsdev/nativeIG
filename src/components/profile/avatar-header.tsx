import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface AvatarHeaderProps {
  image: string;
  totalPosts: number;
  totalFollowers: number;
  totalFollowing: number;
}

const AvatarHeader = ({ image, totalFollowers, totalFollowing, totalPosts }: AvatarHeaderProps) => {
  return (
    <View style={styles.root}>
      <Image source={{ uri: image }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.infoText}>{totalPosts}</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>{totalFollowers}</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>{totalFollowing}</Text>
          <Text>Following</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    alignItems: 'center',
    gap: 25,
    flexDirection: 'row'
  },
  avatar: {
    borderRadius: 60,
    width: 120,
    aspectRatio: 1
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between'
  },
  info: {
    gap: 4,
    alignItems: 'center'
  },
  infoText: {
    fontWeight: '600'
  }
});

export default AvatarHeader
