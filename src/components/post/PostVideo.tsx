import { useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons'

interface IPostVideo {
  videoUrl: string;
  isPaused: boolean
}

export const PostVideo = ({ videoUrl, isPaused }: IPostVideo) => {
  const videoRef = useRef<VideoRef>(null);
  const [isMuted, setIsMuted] = useState(false)
  
  return (
    <View style={styles.root}>
      <Video
        source={{
          uri: videoUrl
        }}
        resizeMode='cover'
        repeat
        paused={isPaused}
        muted={isMuted}
        controlsStyles={{
          hideForward: true,
          hideRewind: true,
          hideFullscreen: true,
          hideSeekBar: true,
        }}
        ref={videoRef}
        style={styles.video}
      />
      <Pressable
        onPress={() => setIsMuted(v => !v)}
        style={styles.mutedIcon}
      >
        <Ionicons name={isMuted ? 'volume-mute' : 'volume-medium'} size={14} color="white" />
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  root: {
    position: 'relative'
  },
  video: {
    width: '100%',
    aspectRatio: 1
  },
  mutedIcon: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    right: 0,
    bottom: 1,
    padding: 4
  }
})
