import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';


const ActionCard = ({ icon, title, description, onPress }) => {
    return (
      <TouchableOpacity
        className="w-[48%] bg-white border border-gray-400 p-4 rounded-lg mb-4"
        onPress={onPress}
      >
        <View className="flex items-center justify-center">
          {icon}
          <Text className="text-xl font-bold text-gray-800 mt-2">{title}</Text>
          <Text className="text-gray-600 text-center text-xs">{description}</Text>
        </View>
      </TouchableOpacity>
    );
  }; 

  
const Account = () => {
    const router = useRouter();
    return (
        <>
         <Stack.Screen
        options={{
          title: "Management",
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

            
            <ScrollView className="flex-1 p-4">
             
             {/* Action Cards */}
             <View className="flex-row flex-wrap justify-between">
               {/* Reusable Action Cards */}
               <ActionCard
                 icon={<MaterialCommunityIcons name="google-classroom" size={40} color="black" />}
                 title="Classes"
                 description="View and organize classes"
                 onPress={() => router.push('/teacher/classes')}
               />
               <ActionCard
                 icon={<Feather name="book-open" size={40} color="black" />}
                 title="Subjects"
                 description="Track and manage school subjects"
                 onPress={() => router.push('/teacher/subjects')}
               />
               <ActionCard
                 icon={<Ionicons name="school" size={40} color="black" />}
                 title="Students"
                 description="Manage School students"
                 onPress={() => router.push('/teacher/students')}
               />
               <ActionCard
                 icon={<Ionicons name="school" size={40} color="black" />}
                 title="Schemes"
                 description="Manage your schemes"
                 onPress={() => router.push('/teacher/schemes')}
               />
             </View>
   
             {/* Account Info Button
             <TouchableOpacity
               className="bg-white flex flex-row items-center border border-gray-400 w-full p-4 rounded-lg mb-4 shadow-lg"
               onPress={() => router.push('/teacher/account-info')}
             >
               <Feather name="user" size={29} color="black" />
               <View className="flex flex-col ml-4">
                 <Text className="text-md font-bold text-gray-800 mt-2">Account Info</Text>
                 <Text className="text-gray-600">Manage your account details</Text>
               </View>
             </TouchableOpacity> */}
           </ScrollView>
           </View>
        </>
        
    );
}


export default Account;
