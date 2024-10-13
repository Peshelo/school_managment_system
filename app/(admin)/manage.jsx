import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter, Stack } from 'expo-router';
import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const Index = () => {
  const router = useRouter();

  // Reusable Card Component
  const ActionCard = ({ title, description, icon, IconComponent, color, route }) => (
    <TouchableOpacity
      className="w-[48%] p-4 rounded-md border border-gray-100 mb-4 shadow-lg"
      onPress={() => router.navigate(route)}
      style={{ backgroundColor: color }}
    >
      <IconComponent name={icon} size={40} color="white" />
      <Text className="text-xl font-bold text-white mt-2">{title}</Text>
      <Text className="text-white">{description}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Manage",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/account')}
              className="flex-row items-center p-2 bg-white/10 mx-2 rounded-md px-4"
            >
              <Icon name="user" size={20} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <View className="flex-1 bg-gray-100">
        <ScrollView className="flex-1 p-4">
          <View className="flex-row flex-wrap justify-between">
            {/* Card 1: School */}
            <ActionCard
              title="School"
              description="Add, edit or view school details"
              icon="school"
              IconComponent={FontAwesome5}
              color="#1E90FF"
              route="/admin/school"
            />

            {/* Card 2: Teachers */}
            <ActionCard
              title="Teachers"
              description="Add, edit or view teacher details"
              icon="users"
              IconComponent={FontAwesome}
              color="#1E90FF"
              route="/admin/teachers"
            />

            {/* Card 3: Classes */}
            <ActionCard
              title="Classes"
              description="View and organize classes"
              icon="google-classroom"
              IconComponent={MaterialCommunityIcons}
              color="#057091FF"
              route="/admin/classes"
            />

            {/* Card 4: Parents */}
            <ActionCard
              title="Parents"
              description="Manage Parent Accounts"
              icon="users"
              IconComponent={FontAwesome}
              color="#057091FF"
              route="/admin/parents"
            />

            {/* Card 5: Subjects */}
            <ActionCard
              title="Subjects"
              description="Track and manage school subjects"
              icon="book-open"
              IconComponent={Feather}
              color="#20B2AA"
              route="/admin/subjects"
            />

            {/* Card 6: Students */}
            <ActionCard
              title="Students"
              description="Manage School students"
              icon="school"
              IconComponent={Ionicons}
              color="#20B2AA"
              route="/settings"
            />

            {/* Card 7: Assign */}
            <ActionCard
              title="Assign"
              description="Assign Teachers to classes"
              icon="school"
              IconComponent={Ionicons}
              color="#4B11B6FF"
              route="/admin/assign"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Index;
