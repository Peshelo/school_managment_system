// pages/teacher/index.js
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import apiClient from '../../utils/apiClient';
import * as SecureStore from 'expo-secure-store';
import { Colors } from '../../constants/Colors';


const Index = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Function to handle search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search logic here, e.g., filter classes or subjects
  };

  const fetchProfile = async () => {
    const token = await SecureStore.getItemAsync('token');
    try {
      const data = await apiClient.getAuthorized('teachers/me', token); // Await the API call
      console.log(data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null); // Set profile to null if error occurs
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
          <Stack.Screen
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: Colors.primary, // Use a gray color for the header
          },
          headerTintColor: '#FFF', // Dark text for header
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: true,
      
        }}
      />
      <View className="flex-1 bg-gray-100">
        {/* Top Nav Bar */}
        <View className="bg-white p-4">
          <Text className="text-2xl font-bold text-gray-800">Hi, {profile?.firstname || 'Teacher'}</Text>
          <Text className="text-gray-600">Manage your classes, subjects, and more.</Text>
        </View>

        {/* Search Bar */}
        {/* <View className="p-4">
          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearch}
            className="bg-white p-3 rounded-lg border border-gray-400"
          />
        </View> */}

        {/* Main Content */}
       
      </View>
    </>
  );
};

export default Index;
