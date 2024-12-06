import {View, Image, StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { ThemeColor } from '@/constants';
// import { UsersSearchNavigationProp } from '@/navigation/SearchTab';
import { IUser } from '@/interfaces/user.interface';
import { RootTabFeedNavigationProp } from '@/navigation/RootTab';

interface IUserListItem {
  user: IUser;
}

const UserListItem = ({user}: IUserListItem) => {
  const navigation = useNavigation<RootTabFeedNavigationProp>();

  const goToUserScreen = () => {
    navigation.navigate('feed', {
      screen: 'userProfile',
      params: {userId: user.id},
    });
  };

  return (
    <Pressable 
    onPress={goToUserScreen} 
    style={styles.root}>
      <Image
        source={{uri: user.image}}
        style={styles.image}
      />

      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: '600',
    marginBottom: 5,
  },
  username: {
    color: ThemeColor.grey,
  },
});

export default UserListItem;
