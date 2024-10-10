import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  // Sample function for handling log out (placeholder)
  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
    router.push('/login'); // Navigates to the login page
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Top Nav Bar */}
      <View className="flex-row justify-between items-center bg-gray-600 p-4">
        {/* Hamburger Menu */}
        <TouchableOpacity>
          <Icon name="bars" size={24} color="white" />
        </TouchableOpacity>

        {/* Screen Title */}
        <Text className="text-white text-xl font-bold">Admin Dashboard</Text>

        {/* Account Management */}
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="user-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="text-2xl font-bold text-gray-800">Welcome, Admin!</Text>
          <Text className="text-gray-600">Manage the school activities from the dashboard below.</Text>
        </View>

      {/* Main Content */}
      <ScrollView className="flex-1 p-4">
        {/* Welcome Section */}
     

        {/* Action Cards */}
        <View className="flex-row flex-wrap justify-between">
          {/* Card 1: Manage Students */}
          <TouchableOpacity
            className="bg-white w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/school')}
          >
            <Icon name="graduation-cap" size={40} color="#383838FF" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Manage School</Text>
            <Text className="text-gray-600">Add, edit or view school details</Text>
          </TouchableOpacity>

          {/* Card 2: Manage Teachers */}
          <TouchableOpacity
            className="bg-white w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/teachers')}
          >
            <Icon name="chalkboard-teacher" size={40} color="#383838FF" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Manage Teachers</Text>
            <Text className="text-gray-600">Add, edit or view teacher details</Text>
          </TouchableOpacity>

          {/* Card 3: Manage Classes */}
          <TouchableOpacity
            className="bg-white w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/classes')}
          >
            <Icon name="building" size={40} color="#383838FF" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Manage Classes</Text>
            <Text className="text-gray-600">View and organize classes</Text>
          </TouchableOpacity>

          {/* Card 4: Manage Attendance */}
          <TouchableOpacity
            className="bg-white w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/attendance')}
          >
            <Icon name="calendar-check" size={40} color="#383838FF" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Attendance</Text>
            <Text className="text-gray-600">Track student attendance</Text>
          </TouchableOpacity>

          {/* Card 5: Manage Fees */}
          <TouchableOpacity
            className="bg-white w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/fees')}
          >
            <Icon name="money-check" size={40} color="#383838FF" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Manage Fees</Text>
            <Text className="text-gray-600">Track and manage school fees</Text>
          </TouchableOpacity>

          {/* Card 6: School Settings */}
          <TouchableOpacity
            className="bg-white w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/settings')}
          >
            <Icon name="cogs" size={40} color="#383838FF" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Settings</Text>
            <Text className="text-gray-600">Configure school settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
