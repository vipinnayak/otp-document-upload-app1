import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SearchScreen = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [tag, setTag] = useState('');
  const [category, setCategory] = useState(''); // Personal / Professional
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    // 📡 API call yaha karo, filhal mock data:
    setResults([
      {
        id: '1',
        name: 'MyDoc.pdf',
        type: 'pdf',
        uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
      {
        id: '2',
        name: 'Image1.jpg',
        type: 'image',
        uri: 'https://via.placeholder.com/150',
      },
    ]);
  };

  const handlePreview = (item) => {
    // ⚡ Navigate to PreviewScreen (aage banayenge)
  };

  const handleDownload = (uri) => {
    // 📥 Download logic (expo-sharing, expo-media-library)
    alert('Download link: ' + uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔍 File Search</Text>

      <TextInput
        placeholder="Enter tag"
        style={styles.input}
        value={tag}
        onChangeText={setTag}
      />

      <TextInput
        placeholder="Category (Personal / Professional)"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />

      <Button title="From Date" onPress={() => setShowFromPicker(true)} />
      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          onChange={(e, date) => {
            setShowFromPicker(false);
            if (date) setFromDate(date);
          }}
        />
      )}

      <Button title="To Date" onPress={() => setShowToPicker(true)} />
      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          onChange={(e, date) => {
            setShowToPicker(false);
            if (date) setToDate(date);
          }}
        />
      )}

      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultCard}>
            <Text>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handlePreview(item)}>
                <Text style={styles.link}>👁 Preview</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDownload(item.uri)}>
                <Text style={styles.link}>⬇️ Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  heading: { fontSize: 24, marginBottom: 10, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    marginVertical: 5,
    padding: 8,
  },
  resultCard: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
