import { Permission } from "@/components/upload/permission"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Camera, useCameraDevice } from "react-native-vision-camera"

const PostUploadScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('front')

  const cameraPermission = Camera.getCameraPermissionStatus()
  const microphonePermission = Camera.getMicrophonePermissionStatus()


  const showPermissionsPage = cameraPermission !== 'granted' || microphonePermission === 'not-determined'

  useEffect(() => {
    if (!showPermissionsPage) {
      setHasPermission(true)
    }
  }, [showPermissionsPage])

  if (!hasPermission) {
    return (
      <Permission handlePermission={(perm) => {
        setHasPermission(perm)
      }} />
    )
  };

  if (device == null) {
    return (
      <View>
        <Text>Camera not found...</Text>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  camera: {
    width: '100%',
    aspectRatio: 3 / 4,
  }
})

export default PostUploadScreen
