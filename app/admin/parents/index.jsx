import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, Button, Modal, StyleSheet } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import the datetime picker

const ParentManagement = () => {
  const [parents, setParents] = useState([]);
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
    dateOfBirth: new Date(), // Default to the current date
    relationToChild: 'FATHER',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editParentId, setEditParentId] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the date picker visibility

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    const token = await SecureStore.getItemAsync('token');
    try {
      const response = await axios.get('http://192.168.43.230:8080/api/parents', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setParents(response.data);
    } catch (error) {
      console.error('Error fetching parents:', error);
    }
  };

  const addParent = async () => {
    const token = await SecureStore.getItemAsync('token');

    try {
      const response = await axios.post('http://192.168.43.230:8080/api/parents', newParent, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setParents([...parents, response.data]);
      Alert.alert('Success', 'Parent added successfully');
      resetForm();
    } catch (error) {
      console.error('Error adding parent:', error);
      Alert.alert('Error', 'Failed to add parent');
    }
  };

  const editParent = async () => {
    const token = await SecureStore.getItemAsync('token');

    try {
      const response = await axios.put(`http://192.168.43.230:8080/api/parents/${editParentId}`, newParent, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setParents(parents.map(parent => (parent.id === editParentId ? response.data : parent)));
      Alert.alert('Success', 'Parent details updated successfully');
      resetForm();
    } catch (error) {
      console.error('Error editing parent:', error);
      Alert.alert('Error', 'Failed to edit parent');
    }
  };

  const deleteParent = async (id) => {
    const token = await SecureStore.getItemAsync('token');

    try {
      await axios.delete(`http://192.168.43.230:8080/api/parents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setParents(parents.filter(parent => parent.id !== id));
      Alert.alert('Success', 'Parent deleted successfully');
    } catch (error) {
      console.error('Error deleting parent:', error);
      Alert.alert('Error', 'Failed to delete parent');
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
      dateOfBirth: new Date(), // Reset date to current date
      relationToChild: 'FATHER',
    });
    setIsAdding(false);
    setIsEditing(false);
    setEditParentId(null);
    setShowDatePicker(false); // Hide date picker on reset
  };

  const openEditModal = (parent) => {
    setNewParent(parent);
    setEditParentId(parent.id);
    setIsEditing(true);
  };

  const renderParent = ({ item }) => (
    <View className="p-4 border border-gray-300 rounded mb-2 bg-white">
      <Text className="text-lg font-bold">{item.firstname} {item.lastname}</Text>
      <Text className="text-gray-600">{item.email}</Text>
      <View className="flex-row justify-between mt-2">
        <TouchableOpacity 
          className="bg-blue-500 text-white px-3 py-1 rounded" 
          onPress={() => openEditModal(item)}
        >
          <Text className="text-white">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="bg-red-500 text-white px-3 py-1 rounded" 
          onPress={() => deleteParent(item.id)}
        >
          <Text className="text-white">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Manage Parents</Text>

      <Button title="Add New Parent" onPress={() => setIsAdding(true)} />

      <FlatList
        data={parents}
        renderItem={renderParent}
        keyExtractor={(item) => item.id.toString()}
        className="mt-4"
      />

      {/* Bottom Sheet Modal for Adding New Parent */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAdding || isEditing}
        onRequestClose={() => resetForm()}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text className="text-lg font-semibold mb-2">{isEditing ? 'Edit Parent' : 'Add New Parent'}</Text>
            <TextInput
              placeholder="First Name"
              value={newParent.firstname}
              onChangeText={(text) => setNewParent({ ...newParent, firstname: text })}
              className="border border-gray-400 p-2 rounded mb-2"
            />
            <TextInput
              placeholder="Last Name"
              value={newParent.lastname}
              onChangeText={(text) => setNewParent({ ...newParent, lastname: text })}
              className="border border-gray-400 p-2 rounded mb-2"
            />
            <TextInput
              placeholder="Email"
              value={newParent.email}
              onChangeText={(text) => setNewParent({ ...newParent, email: text })}
              className="border border-gray-400 p-2 rounded mb-2"
            />
            <TextInput
              placeholder="Address"
              value={newParent.address}
              onChangeText={(text) => setNewParent({ ...newParent, address: text })}
              className="border border-gray-400 p-2 rounded mb-2"
            />
            <TextInput
              placeholder="Username"
              value={newParent.username}
              onChangeText={(text) => setNewParent({ ...newParent, username: text })}
              className="border border-gray-400 p-2 rounded mb-2"
            />
            <TextInput
              placeholder="Password"
              value={newParent.password}
              onChangeText={(text) => setNewParent({ ...newParent, password: text })}
              className="border border-gray-400 p-2 rounded mb-2"
              secureTextEntry
            />
            <TextInput
              placeholder="Mobile Number"
              value={newParent.mobileNumber}
              onChangeText={(text) => setNewParent({ ...newParent, mobileNumber: text })}
              className="border border-gray-400 p-2 rounded mb-2"
            />
            <TextInput
              placeholder="National ID"
              value={newParent.nationalId}
              onChangeText={(text) => setNewParent({ ...newParent, nationalId: text })}
              className="border border-gray-400 p-2 rounded mb-2"
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text className="border border-gray-400 p-2 rounded mb-2">
                {newParent.dateOfBirth.toLocaleDateString() || "Select Date of Birth"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={newParent.dateOfBirth}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  if (date) {
                    setNewParent({ ...newParent, dateOfBirth: date });
                  }
                  setShowDatePicker(false);
                }}
              />
            )}

            <Button 
              title={isEditing ? 'Update Parent' : 'Add Parent'} 
              onPress={isEditing ? editParent : addParent} 
            />
            <Button title="Cancel" onPress={() => resetForm()} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});

export default ParentManagement;

