import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import React, { useState } from 'react';

const EmojiList = ({ onSelect, onCloseModal }) => {
  const emoji = [
    require('../assets/images/emoji1.png'),
    require('../assets/images/emoji2.png'),
    require('../assets/images/emoji3.png'),
    require('../assets/images/emoji4.png'),
    require('../assets/images/emoji5.png'),
    require('../assets/images/emoji6.png'),
  ];

  const testData = [1, 2, 3, 4, 5, 6];

  //   const [emoji] = useState([
  //     require('../assets/background-image.png'),
  //     require('../assets/images/emoji1.png'),
  //     require('../assets/images/emoji2.png'),
  //     require('../assets/images/emoji3.png'),
  //     require('../assets/images/emoji4.png'),
  //     require('../assets/images/emoji5.png'),
  //     require('../assets/images/emoji6.png'),
  //   ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web' ? true : false}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});

export default EmojiList;
