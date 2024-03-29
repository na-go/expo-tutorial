import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Image, ImageURISource, Platform } from 'react-native'
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';
import { FC, memo, useRef, useState } from 'react'
import {
  Button,
  EmojiList,
  EmojiPicker,
  CircleButton,
  IconButton,
  EmojiSticker,
} from './components'
import { saveToLibraryAsync, usePermissions } from 'expo-media-library';
import { launchImageLibraryAsync } from 'expo-image-picker';

const PlaceholderImage: ImageURISource = require('./assets/images/background-image.png')

export const TopPage: FC = () => {
  const [status, requestPermission] = usePermissions()

  if (status === null) {
    requestPermission()
  }

  const imageRef = useRef(null)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState(null)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const source = selectedImage ? { uri: selectedImage } : PlaceholderImage

  const pickImageAsync = async () => {
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    } else {
      alert('You cancelled the image picker.')
    }
  }

  const usePhoto = () => {
    setShowAppOptions(true)
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        if (!imageRef.current) return null;
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <Image source={source} style={styles.image} />
          {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button onPress={pickImageAsync} label="Choose a photo" theme="primary" />
          <Button onPress={usePhoto} label="Use this photo" />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default memo(TopPage)
