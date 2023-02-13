import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const ImageViewer = ({ placeHolderImageSource, selectedImage }) => {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeHolderImageSource;
  return <Image source={imageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default ImageViewer;
