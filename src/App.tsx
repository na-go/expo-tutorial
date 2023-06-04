import { Button } from './components/Button';
import { ImageViewer } from './components/ImageViewer';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });


    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    } else {
      alert('You cancelled the image picker.');
    }
  };
  return (
    <View style={styles.container}>
      <ImageViewer placeholderImage={PlaceholderImage} selectedImage={selectedImage} />
      <View style={styles.footerContainer}>
        <Button onPress={pickImageAsync} label="Choose a photo" theme="primary" />
        <Button onPress={() => alert('嫌い！')} label="Use this photo"/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
});


registerRootComponent(App);