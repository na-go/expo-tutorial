import { FC } from 'react'
import { StyleSheet, Image, View, ImageSourcePropType } from 'react-native'

interface ImageViewerProps {
  placeholderImage?: ImageSourcePropType
  selectedImage?: string | null
}

export const ImageViewer: FC<ImageViewerProps> = ({ placeholderImage, selectedImage }) => {
  const source = selectedImage ? { uri: selectedImage } : placeholderImage

  if (!source) return null

  return (
    <View style={styles.imageContainer}>
      <Image source={source} style={styles.image} />
    </View>
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
})
