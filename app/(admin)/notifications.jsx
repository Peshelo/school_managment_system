import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '@/constants/Colors';

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([
    { id: '1', message: 'You have a new assignment' },
    { id: '2', message: 'Meeting with the head of the department' },
    { id: '3', message: 'Your grades are out' },
    { id: '4', message: 'New event: Hackathon 2024' },
    // Add more notifications as needed
  ]);

  // Filter notifications based on search term
  const filteredNotifications = notifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to remove notification by id
  const removeNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  // Render each notification
  const renderItem = ({ item }) => (
    <View className="flex-row justify-between items-center p-4 bg-white mb-2 rounded-lg shadow">
      <Text className="text-gray-700">{item.message}</Text>
      <TouchableOpacity onPress={() => removeNotification(item.id)}>
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    
    <View className="flex-1 bg-gray-100 p-4">
            <Stack.Screen
        options={{
          title: "Notifications",
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
      {/* Search Input */}
      <TextInput
        className="p-3 bg-white rounded-lg mb-4 shadow"
        placeholder="Search notifications..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text className="text-center text-gray-500">No notifications found</Text>}
      />
    </View>
  );
};

export default Notifications;
