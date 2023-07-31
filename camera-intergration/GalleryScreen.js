import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native'; 
import * as ImagePicker from 'expo-image-picker';

const GalleryScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage({ uri: result.uri });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {selectedImage && <Image source={selectedImage} style={{ flex: 1 }} resizeMode="contain" />}
      <TouchableOpacity onPress={selectImage}>
        <Text style={{ fontSize: 18, color: 'black' }}>Select Image from Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GalleryScreen;
