import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import { useState } from 'react';

const PlaceHolderImage = require('./assets/background-image.png');

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    const [showOptions, setShowOptions] = useState(false);

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setSelectedImage(result.assets[0].uri);
      setShowOptions(true);
    } else {
      alert('No picture was selected');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeHolderImageSource={PlaceHolderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          label={'Choose a photo'}
          theme='primary'
          onPress={pickImageAsync}
        />
        <Button
          label={'Do not click me!'}
          onPress={() => setShowOptions(true)}
        />
      </View>
      <StatusBar style='auto' />
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
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
