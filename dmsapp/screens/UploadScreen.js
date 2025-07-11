import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform, Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const UploadScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [major, setMajor] = useState('');
  const [minor, setMinor] = useState('');
  const [tags, setTags] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [file, setFile] = useState(null);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
    });
    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,

    });
    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      Alert.alert('Validation', 'Please select a file');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('file', {
        uri: file.uri,
        name: file.name || 'document.jpg',
        type: file.mimeType || 'image/jpeg',
      });

      formData.append('data', JSON.stringify({
        major_head: major,
        minor_head: minor,
        document_date: date.toISOString().split('T')[0],
        document_remarks: remarks,
        tags: tags.map(tag => ({ tag_name: tag.trim() })),
        user_id: 'nitin' // TODO: replace with actual logged-in user
      }));

      const token = await AsyncStorage.getItem('authToken');

      const response = await api.post('/saveDocumentEntry', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    token: token,
  },
});

      Alert.alert('Success', 'Document uploaded successfully!');
      console.log(response.data);

      // Optionally reset fields
      setFile(null);
      setMajor('');
      setMinor('');
      setTags([]);
      setRemarks('');

    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload document');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Document</Text>

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={styles.label}>Document Date: {date.toDateString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={handleDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Major Head (Personal / Professional)"
        value={major}
        onChangeText={text => {
          setMajor(text);
          setMinor('');
        }}
      />

      {major === 'Personal' && (
        <TextInput
          style={styles.input}
          placeholder="Minor Head (e.g. John, Tom)"
          value={minor}
          onChangeText={setMinor}
        />
      )}
      {major === 'Professional' && (
        <TextInput
          style={styles.input}
          placeholder="Minor Head (e.g. HR, IT)"
          value={minor}
          onChangeText={setMinor}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Tags (comma separated)"
        onChangeText={(text) => setTags(text.split(','))}
      />

      <TextInput
        style={styles.input}
        placeholder="Remarks"
        value={remarks}
        onChangeText={setRemarks}
      />

      <View style={styles.buttonRow}>
        <Button title="Pick File" onPress={pickFile} />
        <Button title="Camera" onPress={takePicture} />
      </View>

      <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10, color: '#333' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10
  }
});

export default UploadScreen;
