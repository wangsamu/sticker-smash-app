import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const ImageViewer = ({ placeHolderImageSource }) => {
  return <Image source={placeHolderImageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default ImageViewer;
