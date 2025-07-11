import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '../services/api'; // 🛠️ API service import karo

const LoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState('');

  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      Alert.alert('Invalid', 'Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      // 🔄 OTP bhejne ka API call
      const response = await api.post('/generateOTP', {
        mobile_number: mobile,
      });

      console.log('OTP Sent Successfully:', response.data);
      Alert.alert('Success', 'OTP sent to your mobile number');

      // ✅ OTP verify screen par jao
      navigation.navigate('OTPVerify', { mobile });

    } catch (error) {
      console.error('OTP Error:', error.message);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Mobile Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="Mobile Number"
        maxLength={10}
        value={mobile}
        onChangeText={setMobile}
      />
      <Button title="Send OTP" onPress={handleSendOTP} color="#2196F3" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
    padding: 10, marginBottom: 20
  }
});

export default LoginScreen;
