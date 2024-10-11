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
    <Stack.Screen options={{title:"Welcome Teacher"}}/>
    <View className="flex-1 bg-gray-100">
      {/* Top Nav Bar */}
      {/* <TopNavBar/> */}
      {/* <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="text-2xl font-bold text-gray-800">Welcome, Teacher!</Text>
          <Text className="text-gray-600">Manage the your classes, subjects and more.</Text>
        </View> */}

      {/* Main Content */}
      <ScrollView className="flex-1 p-4">
        {/* Welcome Section */}
     

        {/* Action Cards */}
        <View className="flex-row flex-wrap justify-between">
          {/* Card 3: Manage Classes */}
          <TouchableOpacity
            className="bg-white border border-gray-400 w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/teacher/classes')}
          >
<MaterialCommunityIcons name="google-classroom" size={40} color="black" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Classes</Text>
            <Text className="text-gray-600">View and organize classes</Text>
          </TouchableOpacity>
          {/* Card 5: Manage Fees */}
          <TouchableOpacity
            className="bg-white border border-gray-400 w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/teacher/subjects')}
          >
<Feather name="book-open" size={40} color="black" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Subjects</Text>
            <Text className="text-gray-600">Track and manage school subjects</Text>
          </TouchableOpacity>

          {/* Card 6: School Settings */}
          <TouchableOpacity
            className="bg-white border border-gray-400 w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/teacher/students')}
          >
<Ionicons name="school" size={40} color="black" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Students</Text>
            <Text className="text-gray-600">Manage School students</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white border border-gray-400 w-[48%] p-4 rounded-lg mb-4 shadow-lg"
            onPress={() => router.push('/teacher/schemes')}
          >
<Ionicons name="school" size={40} color="black" />
            <Text className="text-xl font-bold text-gray-800 mt-2">Schemes</Text>
            <Text className="text-gray-600">Manage your schemes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </>
  );
};

export default Index;
