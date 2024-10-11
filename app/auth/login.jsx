import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';

const Index = () => {
  const [email, setEmail] = useState('gomopeshel@gmail.com');
  const [password, setPassword] = useState('1212');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router


  const validateInputs = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    try {
      const response = await fetch('http://192.168.100.240:1234/auth/login', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        // Save token and role in SecureStore
        await SecureStore.setItemAsync('token', result.token);
        await SecureStore.setItemAsync('role', JSON.stringify(result.role));

        // Alert.alert('Success', result.message);
        router.push('/(teacher)/');

        if(result.role === 'ADMIN') {
          // Redirect to admin dashboard
          // navigation.navigate('AdminDashboard');
        }
      } else {
        Alert.alert('Login Failed', result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{title:"Login",headerShown:false}} />
      {/* Header */}
      <View className="bg-gray-800 h-[200px] justify-center px-5 pt-10">
        <Text className="text-white text-4xl font-bold">Sign in to your account</Text>
      </View>

      {/* Form Section */}
      <View className="p-5">
        {/* Email Input */}
        <View className="mb-4">
          <View
            className={`flex flex-row items-center border rounded-lg p-3 ${
              emailError ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <Icon name="envelope" size={20} color={emailError ? 'red' : 'gray'} />
            <TextInput
              onChangeText={(text) => {
                setEmail(text);
                setEmailError(''); // Reset error on input change
              }}
              onFocus={() => setEmailError('')} // Remove error on focus
              value={email}
              className="ml-3 flex-1 text-base"
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="gray"
            />
          </View>
          {emailError ? <Text className="text-red-500 mt-1">{emailError}</Text> : null}
        </View>

        {/* Password Input */}
        <View className="mb-4">
          <View
            className={`flex flex-row items-center border rounded-lg p-3 ${
              passwordError ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <Icon name="lock" size={20} color={passwordError ? 'red' : 'gray'} />
            <TextInput
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError(''); // Reset error on input change
              }}
              onFocus={() => setPasswordError('')} // Remove error on focus
              value={password}
              className="ml-3 flex-1 text-base"
              placeholder="Password"
              secureTextEntry
              placeholderTextColor="gray"
            />
          </View>
          {passwordError ? <Text className="text-red-500 mt-1">{passwordError}</Text> : null}
        </View>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Link href="/forgot-password" className="text-gray-800 text-right mb-6">
            Forgot Password?
          </Link>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          className="bg-gray-800 p-4 rounded-lg"
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white text-center font-bold text-lg">
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <TouchableOpacity className="mt-4">
          <Link href="/signup" className="text-center text-gray-800 text-md">
            Don’t have an account? Sign up
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
