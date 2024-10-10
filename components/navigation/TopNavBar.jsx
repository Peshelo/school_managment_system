import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const TopNavBar = () => {
    const handleLogout = () => {
        // Add logout logic here
        console.log('Logout clicked');
        router.push('/login'); // Navigates to the login page
      };
    return (
        <SafeAreaView className=" bg-gray-100">
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
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default TopNavBar;
