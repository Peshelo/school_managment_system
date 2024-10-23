import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import apiClient from '../../utils/apiClient';

const ChildCard = ({ name, onPress, isSelected }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`flex flex-col justify-start w-full p-4 px-6 rounded-xl mb-4 shadow-lg ${
        isSelected ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-400'
      }`}
      style={{ borderStyle: isSelected ? 'solid' : 'dashed', borderWidth: 2 }}
    >
      <View className="flex flex-row justify-start items-center w-full gap-x-4">
        <MaterialCommunityIcons name="account" size={29} color={isSelected ? 'blue' : 'black'} />
        <Text className={`text-xl font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
          {name}
        </Text>
      </View>
      <Text className="text-gray-400 mt-2 text-xs">
        View and analyze tests, exercises, and exam reports
      </Text>
    </Pressable>
  );
};

const Index = () => {
  const router = useRouter();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [parent, setParent] = useState(null);
  const [children, setChildren] = useState([]);

  // Fetch children from the API when the component mounts
  const fetchChildren = async () => {
    try {
      // Fetch children from the API
      const response = await apiClient.get('parents/6'); // Adjust your API call as necessary
      const { students } = response; // Destructure students from the response
      setParent(response); // Set the fetched parent
      setChildren(students); // Set the fetched students
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);



  const handleChildSelect = (name) => {
    setSelectedStudent(name);
  };

  const handleProceed = () => {
    if (selectedStudent) {
      router.push('/(parent)/children/1');
    }
  };

  return (
    <View className="flex-1 flex flex-col bg-gray-100 justify-center items-center">
      <Stack.Screen options={{ headerShown: false }} />
      
        {/* Header */}
        <View className="w-full flex-1 p-4 pt-10">
          <Text className="text-3xl font-bold text-gray-800">Hi, {parent?.firstname} {parent?.lastname}</Text>
          <Text className="text-md font-bold text-gray-500">View your children's educational performance</Text>
        </View>

        <Text className="my-4 text-gray-500 w-full text-center">
          Select a child to proceed
        </Text>

        <ScrollView className="w-full px-4" contentContainerStyle={{ alignItems: 'center' }}>
          {/* Child Cards */}
          {children.map((child) => (
            <ChildCard
              key={child.id} // Add a unique key for each child
              name={`${child.firstname} ${child.lastname}`} // Combine first and last names
              onPress={() => handleChildSelect(`${child.firstname} ${child.lastname}`)} // Pass full name on select
              isSelected={selectedStudent === `${child.firstname} ${child.lastname}`}
            />
          ))}

          {/* Proceed Button */}
          <Pressable
            onPress={handleProceed}
            disabled={!selectedStudent}
            style={{
              opacity: selectedStudent ? 1 : 0.5,
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className={`mt-4 px-8 py-4 w-full rounded-xl ${
              selectedStudent ? 'bg-blue-600' : 'bg-gray-400'
            }`}
          >
            <Text className="text-white font-bold text-center">Proceed</Text>
          </Pressable>
        </ScrollView>
      </View>
  );
};

export default Index;
