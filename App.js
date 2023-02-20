import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import domtoimage from 'dom-to-image';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import { useRef, useState } from 'react';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

const PlaceHolderImage = require('./assets/background-image.png');

export default function App() {
  const [status, requestPermision] = MediaLibrary.usePermissions();

  const [selectedImage, setSelectedImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [stickerSize, setStickerSize] = useState(null);

  const imageRef = useRef();

  if (status === null) {
    requestPermision();
  }

  const pickImageAsync = async () => {
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

  const onReset = () => {
    setSelectedImage(null);
    setShowOptions(false);
    setPickedEmoji(null)
  };
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS === 'web') {
      domtoimage
        .toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        })
        .then((dataUrl) => {
          let link = document.createElement('a');
          link.download = 'sticker-smash.jpeg';
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeHolderImageSource={PlaceHolderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji ? (
            <EmojiSticker stickerSource={pickedEmoji} imageSize={40} />
          ) : null}
        </View>
      </View>
      {showOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Refresh' onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon='save-alt'
              label='Save'
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label={'Choose a photo'}
            theme='primary'
            onPress={pickImageAsync}
          />
          <Button
            label={'use this picture'}
            onPress={() => setShowOptions(true)}
          />
        </View>
      )}
      <StatusBar style='light' />
      <EmojiPicker isVisible={isModalVisible} onClose={onCloseModal}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onCloseModal} />
      </EmojiPicker>
    </GestureHandlerRootView>
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
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
