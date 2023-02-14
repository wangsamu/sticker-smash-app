import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const IconButton = ({ icon, label, onPress }) => {
  return (
    <View>
      <Pressable style={styles.iconButton} onPress={onPress}>
        <MaterialIcons name={icon} size={24} color='#fff' />
        <Text style={styles.iconButtonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});

export default IconButton;
