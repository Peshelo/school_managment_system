import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';
import { useActionSheet } from '@expo/react-native-action-sheet';

const Index = () => {
  const { showActionSheetWithOptions } = useActionSheet();

  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
  const [email, setEmail] = useState('parent@gmail.com');
  const [password, setPassword] = useState('admin');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const openActionSheet = () => {
    const options = ['Forgot Password','Contact', 'Cancel'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions({
      options,
      destructiveButtonIndex,
    },
    (buttonIndex) => {
      if(buttonIndex === 0) {
        router.push('/forgot-password');
      }
      if(buttonIndex === 1) {
        // WebBrowser.openBrowserAsync('https://www.google.com');
      }
    })
  
  }

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
      console.log(`${BASE_URL}/auth/login`);
      const response = await fetch(`${BASE_URL}/auth/login`, {
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

        if(result.role[0] === 'ADMIN') {
          router.replace('/(admin)/');
        }
        if(result.role[0] === 'TEACHER') {
          router.replace('/(teacher)/');
        }
        if(result.role[0] === 'PARENT') {
          router.replace('/parent/');
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
    <View className="flex-1 bg-white flex flex-col w-full justify-center items-center">
      <Stack.Screen options={{title:"Login",headerShown:false}} />
      {/* Header */}
      <View className="h-fit flex flex-col justify-center items-center p-4 w-full px-5 pt-10">
        <Image source={require('../../assets/images/logo.png')} className="w-[200px] h-[200px] object-contain p-4" width={20} height={20}  />
        <Text className="text-black text-xl font-bold">Sign in to your account</Text>
      </View>

      {/* Form Section */}
      <View className="p-5 w-full">
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
                setEmailError('');
              }}
              onFocus={() => setEmailError('')}
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
                setPasswordError('');
              }}
              onFocus={() => setPasswordError('')}
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

        <TouchableOpacity onPress={()=>
          openActionSheet()
        } className="mt-4">
            <Text className="text-center text-gray-400 text-md">
            Can’t Login?
              </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
