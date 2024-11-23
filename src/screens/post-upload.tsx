import { Permission } from "@/components/upload/permission"
import { ThemeColor } from "@/constants"
import { useEffect, useRef, useState } from "react"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"
import { Camera, useCameraDevice } from "react-native-vision-camera"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

enum CameraPosition {
  Front = 'front',
  Back = 'back'
};

const PostUploadScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>(CameraPosition.Back);
  const [flash, setFlash] = useState<'off' | 'auto'>('off');
  const cameraRef = useRef<Camera | null>(null)
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const device = useCameraDevice(cameraPosition)

  const cameraPermission = Camera.getCameraPermissionStatus()
  const microphonePermission = Camera.getMicrophonePermissionStatus()

  const showPermissionsPage = cameraPermission !== 'granted' || microphonePermission === 'not-determined'
  // const supportsFlash = device?.hasFlash ?? false

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

  const flipCamera = () => {
    setCameraPosition(currentCamera => currentCamera === CameraPosition.Back ?
      CameraPosition.Front : CameraPosition.Back
    )
  };

  const onTakePhoto = async () => {
    if (!cameraRef || !cameraRef?.current) return;
    const defaultCameraProps = {};
    let cameraProps = {};

    if (device?.hasFlash) {
      cameraProps = {
        ...defaultCameraProps,
        flash
      }
    };


    try {
      const photo = await cameraRef.current.takePhoto(cameraProps)
      const result = await fetch(`file://${photo.path}`)
      const photoBlob = await result.blob();
      console.log('captured photo', photoBlob)
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Failed to capture')
    }
  };

  const onRecordVideo = async () => {
    if (!cameraRef || !cameraRef?.current || isRecording) return;
    setIsRecording(true)
    let videoProps = {};

    if (device?.hasFlash) {
      videoProps = {
        ...videoProps,
        flash
      }
    };

    try {
      const video = cameraRef.current.startRecording({
        ...videoProps,
        onRecordingFinished: (video) => console.log(video),
        onRecordingError: (error) => console.error(error)
      })
      console.log('captured vid')
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Failed to start video')
    }
  }

  const onStopRecording = () => {
    if (isRecording) {

      cameraRef.current?.stopRecording();
      setIsRecording(false);
    }
  };

  const onChangeFlash = () => {
    if (!device?.hasFlash) {
      Alert.alert('Error', 'This device does not have a flash')
      return;
    };

    // 'auto' | 'off' | "on"
    setFlash((f) => (f === 'off' ? 'auto' : 'off'))
  }


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
        ref={cameraRef}
        device={device}
        // torch={device?.hasTorch ? 'on' : 'off'}
        photo={true}
        video={true}
        preview={true}
        resizeMode="cover"
        onInitialized={() => {
          setIsCameraReady(true)
        }}
        onPreviewStarted={() => console.log('Preview started!')}
        onPreviewStopped={() => console.log('Preview stopped!')}
        isActive={true}
      />

      <View style={[styles.buttonsContainer, { top: 25 }]}>
        <MaterialIcons name="close" size={30} color={ThemeColor.white} />

        {device?.hasFlash && (
          <Pressable onPress={onChangeFlash}>
            <MaterialIcons
              name={flash == 'auto' ? "flash-auto" : "flash-off"}
              size={30}
              color={ThemeColor.white}
            />
          </Pressable>
        )}

        <MaterialIcons name="settings" size={30} color={ThemeColor.white} />
      </View>

      <View style={[styles.buttonsContainer, { bottom: 25 }]}>
        <Pressable>
          <MaterialIcons name="photo-library" size={30} color={ThemeColor.white} />
        </Pressable>

        {isCameraReady && (
          <Pressable
            onPress={onTakePhoto}
            onLongPress={onRecordVideo}
            onPressOut={onStopRecording}
          >
            <View
              style={[
                styles.circle,
                { backgroundColor: isRecording ? ThemeColor.accent : ThemeColor.white },
              ]}
            />
          </Pressable>
        )}


        <Pressable onPress={flipCamera}>
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color={ThemeColor.white}
          />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: ThemeColor.black
  },
  camera: {
    width: '100%',
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
  },
  circle: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: ThemeColor.white,
  },
})

export default PostUploadScreen
