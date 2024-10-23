import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, Modal, StyleSheet } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Stack, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import apiClient from '../../../utils/apiClient';
// Create an API client

const ParentManagement = () => {
  const [parents, setParents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentParent, setCurrentParent] = useState(null);
  const router = useRouter();
  const token = SecureStore.getItemAsync('token');

  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = (parent) => {
    setCurrentParent(parent);
    const options = ['View', 'Edit', 'Delete','Assign Child', 'Cancel'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;

    showActionSheetWithOptions({
      options,
      title: 'Parent Actions',
      separatorStyle: {
        color: 'gray',
      },
      useModal: true,
      message: 'Select an action to perform on the parent',
      showSeparators: true,
      destructiveButtonIndex,
      cancelButtonIndex,
    },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // Navigate to Parent Profile (Replace with actual profile route)
          router.push(`/admin/parents/${parent.id}`);
        }
        if (buttonIndex === 1) {
          setModalVisible(true);
        }
        if (buttonIndex === 2) {
          handleDeleteParent(parent.id);
        }
      });
  };

  const fetchParents = async () => {
    const token = await SecureStore.getItemAsync('token');
    try {
      const response = await apiClient.get('parents');
      setParents(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  const handleDeleteParent = async (parentId) => {
    const token = await SecureStore.getItemAsync('token');
    try {
      await apiClient.delete(`admin/parents/${parentId}`,token);
      Alert.alert('Success', 'Parent deleted successfully!');
      fetchParents();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete parent.');
    }
  };

  const renderParentItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log("Open Parent Profile")} className="border-b border-gray-300 mx-1 rounded-md p-4 flex-row items-center">
      <View className="flex-1">
        <Text className="font-bold">{item.firstname} {item.lastname}</Text>
        <Text>{item.email}</Text>
      </View>
      <TouchableOpacity onPress={() => openActionSheet(item)} className="flex-row">
        <MaterialCommunityIcons name="dots-vertical" size={24} color="gray" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Manage Parents",
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => setModalVisible(true)} className="p-2 rounded-md">
              <MaterialCommunityIcons name="account-plus" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={parents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderParentItem}
        contentContainerStyle={{ paddingBottom: 80 }} // Add padding for fixed button space
        showsVerticalScrollIndicator={false} // Hides the scroll indicator
      />

      {/* Modal for Adding/Editing Parent */}
      <AddParentModal 
        visible={modalVisible} 
        onClose={() => { setCurrentParent(null); setModalVisible(false); }} 
        currentParent={currentParent} 
        setCurrentParent={setCurrentParent} 
        refresh={fetchParents} 
      />
    </View>
  );
};

const AddParentModal = ({ visible, onClose, currentParent, setCurrentParent, refresh }) => {
 

  const [newParent, setNewParent] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    username: '',
    password: '',
    gender: 'MALE',
    mobileNumber: '',
    nationalId: '',
    dateOfBirth: '',
    relationToChild: 'FATHER',
    roles:['PARENT']
  });
  
  // State for date picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleEditParent = async () => {
    const token = await SecureStore.getItemAsync('token');
    try {
      await apiClient.put(`/admin/parents/${currentParent.id}`, currentParent, token);
      Alert.alert('Success', 'Parent updated successfully!');
      refresh();
      onClose();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update parent.');
    }
  };

  const handleCreateParent = async () => {
    const token = await SecureStore.getItemAsync('token');
    try {
      await apiClient.post('parents', newParent,token);
      Alert.alert('Success', 'Parent created successfully!');
      refresh();
      onClose();
      resetForm();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create parent.');
    }
  };

  const resetForm = () => {
    setNewParent({
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      username: '',
      password: '',
      gender: 'MALE',
      mobileNumber: '',
      nationalId: '',
      dateOfBirth: '',
      relationToChild: 'FATHER',
    });
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    if (currentParent) {
      setCurrentParent({ ...currentParent, dateOfBirth: currentDate.toISOString().split('T')[0] });
    } else {
      setNewParent({ ...newParent, dateOfBirth: currentDate.toISOString().split('T')[0] });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle='pageSheet'>
      <View className="flex flex-row justify-between p-4 items-center">
        <Text className="text-xl font-bold text-center">
          {currentParent ? 'Edit Parent' : 'Create Parent'}
        </Text>
        <TouchableOpacity className="text-center" onPress={onClose}>
          <MaterialCommunityIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="p-4">
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded-md"
          placeholder="First Name"
          value={currentParent ? currentParent.firstname : newParent.firstname}
          onChangeText={(text) => currentParent ? setCurrentParent({ ...currentParent, firstname: text }) : setNewParent({ ...newParent, firstname: text })}
        />
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded-md"
          placeholder="Last Name"
          value={currentParent ? currentParent.lastname : newParent.lastname}
          onChangeText={(text) => currentParent ? setCurrentParent({ ...currentParent, lastname: text }) : setNewParent({ ...newParent, lastname: text })}
        />
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded-md"
          placeholder="Email"
          value={currentParent ? currentParent.email : newParent.email}
          onChangeText={(text) => currentParent ? setCurrentParent({ ...currentParent, email: text }) : setNewParent({ ...newParent, email: text })}
        />
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded-md"
          placeholder="Address"
          value={currentParent ? currentParent.address : newParent.address}
          onChangeText={(text) => currentParent ? setCurrentParent({ ...currentParent, address: text }) : setNewParent({ ...newParent, address: text })}
        />
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded-md"
          placeholder="Username"
          value={currentParent ? currentParent.username : newParent.username}
          onChangeText={(text) => currentParent ? setCurrentParent({ ...currentParent, username: text }) : setNewParent({ ...newParent, username: text })}
        />
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded-md"
          placeholder="Password"
          value={currentParent ? currentParent.password : newParent.password}
          onChangeText={(text) => currentParent ? setCurrentParent({ ...currentParent, password: text }) : setNewParent({ ...newParent, password: text })}
          secureTextEntry
        />
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded-md"
          placeholder="Mobile Number"
          value={currentParent ? currentParent.mobileNumber : newParent.mobileNumber}
          onChangeText={(text) => currentParent ? setCurrentParent({ ...currentParent, mobileNumber: text }) : setNewParent({ ...newParent, mobileNumber: text })}
        />
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded-md"
          placeholder="National ID"
          value={currentParent ? currentParent.nationalId : newParent.nationalId}
          onChangeText={(text) => currentParent ? setCurrentParent({ ...currentParent, nationalId: text }) : setNewParent({ ...newParent, nationalId: text })}
        />

        {/* Date of Birth Picker */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)} className="border border-gray-300 p-2 mb-2 rounded-md">
          <Text>{currentParent ? currentParent.dateOfBirth : newParent.dateOfBirth || 'Select Date of Birth'}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={currentParent ? new Date(currentParent.dateOfBirth) : new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <TouchableOpacity
          className="bg-blue-500 p-2 rounded-md mt-4"
          onPress={currentParent ? handleEditParent : handleCreateParent}
        >
          <Text className="text-white text-center">{currentParent ? 'Update Parent' : 'Create Parent'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ParentManagement;

const styles = StyleSheet.create({
  // You can add styles here
});
