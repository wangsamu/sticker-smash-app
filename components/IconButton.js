import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const IconButton = ({ icon, label, onPress }) => {
  return (
    <View>
      <Pressable style={iconButton} onPress={onPress}>
        <MaterialIcons name={icon} size={24} color='#fff' />
        <Text style={iconButtonLabelt}>{label}</Text>
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
