import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link, Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/navigation/TopNavBar';
import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Index = () => {
  const router = useRouter();

  // Sample function for handling log out (placeholder)


  return (
    <>
    <Stack.Screen options={{title:"Admin Dashboard"}}/>
    <View className="flex-1 bg-gray-100">
      {/* Top Nav Bar */}
      {/* <TopNavBar/> */}
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
            className="bg-white border border-gray-400 w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/admin/school')}
          >
<FontAwesome5 name="school" size={40} color="black" />
            <Text className="text-xl font-bold text-gray-800 mt-2">School</Text>
            <Text className="text-gray-600">Add, edit or view school details</Text>
          </TouchableOpacity>

          {/* Card 2: Manage Teachers */}
          <TouchableOpacity
            className="bg-white border border-gray-400 w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/admin/teachers')}
          >
<FontAwesome name="users" size={40} color="black" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Teachers</Text>
            <Text className="text-gray-600">Add, edit or view teacher details</Text>
          </TouchableOpacity>

          {/* Card 3: Manage Classes */}
          <TouchableOpacity
            className="bg-white border border-gray-400 w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/admin/classes')}
          >
<MaterialCommunityIcons name="google-classroom" size={40} color="black" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Classes</Text>
            <Text className="text-gray-600">View and organize classes</Text>
          </TouchableOpacity>

          {/* Card 4: Manage Attendance */}
          <TouchableOpacity
            className="bg-white border border-gray-400 w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/admin/parents')}
          >
<FontAwesome name="users" size={40} color="black" />
<Text className="text-xl font-bold text-gray-800 mt-2">Parents</Text>
            <Text className="text-gray-600">Manage Parent Accounts</Text>
          </TouchableOpacity>

          {/* Card 5: Manage Fees */}
          <TouchableOpacity
            className="bg-white border border-gray-400 w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/admin/subjects')}
          >
<Feather name="book-open" size={40} color="black" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Subjects</Text>
            <Text className="text-gray-600">Track and manage school subjects</Text>
          </TouchableOpacity>

          {/* Card 6: School Settings */}
          <TouchableOpacity
            className="bg-white border border-gray-400 w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/settings')}
          >
<Ionicons name="school" size={40} color="black" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Students</Text>
            <Text className="text-gray-600">Manage School students</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white border border-gray-400 w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/admin/assign')}
          >
<Ionicons name="school" size={40} color="black" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Assign</Text>
            <Text className="text-gray-600">Assign Teachers to classes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </>
  );
};

export default Index;
