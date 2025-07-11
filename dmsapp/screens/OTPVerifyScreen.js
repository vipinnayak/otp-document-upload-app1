import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '../services/api'; // API base
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPVerifyScreen = ({ route, navigation }) => {
  const { mobile } = route.params;
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert('Invalid', 'Please enter 6-digit OTP');
      return;
    }

    try {
      // 🔄 OTP verify API call
      const response = await api.post('/validateOTP', {
        mobile_number: mobile,
        otp: otp
      });

      const token = response.data.token; // Server se token mila
      if (!token) {
        throw new Error('No token received');
      }

      // 💾 Token store karo (for future use)
      await AsyncStorage.setItem('authToken', token);
      Alert.alert('Success', 'OTP Verified Successfully');

      // ✅ Home screen/drawer navigate karo
      navigation.replace('Home'); // "Home" = drawer navigator ka name hona chahiye

    } catch (error) {
      console.error('OTP Verification Error:', error);
      Alert.alert('Error', 'OTP verification failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP sent to {mobile}</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="Enter OTP"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />
      <Button title="Verify OTP" onPress={handleVerify} color="#4CAF50" />
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

export default OTPVerifyScreen;
