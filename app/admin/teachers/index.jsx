import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker'; // Importing the new Picker
import TopNavBar from '@/components/navigation/TopNavBar';

const ManageTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState(null);
    const [newTeacher, setNewTeacher] = useState({
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
        roles: ['TEACHER'],
        school: { id: 1 },
    });
    const token = SecureStore.getItemAsync('token');

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://192.168.181.28:8080/api/teachers', {
                headers: {
                    "Authorization": `Bearer ${await token}`
                }
            });
            setTeachers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateTeacher = async () => {
        try {
            await axios.post('http://192.168.181.28:8080/api/teachers', newTeacher, {
                headers: {
                    "Authorization": `Bearer ${await token}`
                }
            });
            Alert.alert('Success', 'Teacher created successfully!');
            fetchTeachers();
            setModalVisible(false);
            resetForm();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to create teacher.');
        }
    };

    const handleDeleteTeacher = async (teacherId) => {
        try {
            await axios.delete(`http://192.168.181.28:8080/api/teachers/${teacherId}`, {
                headers: {
                    "Authorization": `Bearer ${await token}`
                }
            });
            Alert.alert('Success', 'Teacher deleted successfully!');
            fetchTeachers();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to delete teacher.');
        }
    };

    const handleEditTeacher = async () => {
        try {
            await axios.put(`http://192.168.181.28:8080/api/teachers/${currentTeacher.id}`, currentTeacher, {
                headers: {
                    "Authorization": `Bearer ${await token}`
                }
            });
            Alert.alert('Success', 'Teacher updated successfully!');
            fetchTeachers();
            setModalVisible(false);
            setCurrentTeacher(null);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update teacher.');
        }
    };

    const resetForm = () => {
        setNewTeacher({
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
            roles: ['TEACHER'],
            school: { id: 1 },
        });
    };

    return (
        <View className="flex-1 bg-white">
            <View className="p-4">
                <Text className="text-xl font-bold mb-4">Manage Teachers</Text>

                <FlatList
                    data={teachers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View className="border-b border-gray-300 p-4 flex-row justify-between items-center">
                            <View className="flex-1">
                                <Text className="font-bold">{item.firstname} {item.lastname}</Text>
                                <Text>{item.email}</Text>
                            </View>
                            <View className="flex-row">
                                <TouchableOpacity onPress={() => { setCurrentTeacher(item); setModalVisible(true); }} className="p-2 rounded-md mr-2">
                                    <Text className="text-blue-500">Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteTeacher(item.id)} className="p-2 rounded-md">
                                    <Text className="text-red-500">Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />

                <TouchableOpacity onPress={() => setModalVisible(true)} className="bg-green-500 p-3 rounded-md mt-4">
                    <Text className="text-white text-center">Create Teacher</Text>
                </TouchableOpacity>

                {/* Modal for Adding/Editing Teacher */}
                <Modal visible={modalVisible} animationType="slide">
                    <View className="p-4">
                        <Text className="text-xl font-bold mb-4 text-center">
                            {currentTeacher ? 'Edit Teacher' : 'Create Teacher'}
                        </Text>

                        <TextInput
                            className="border border-gray-300 p-2 mb-2 rounded-md"
                            placeholder="First Name"
                            value={currentTeacher ? currentTeacher.firstname : newTeacher.firstname}
                            onChangeText={(text) => currentTeacher ? setCurrentTeacher({ ...currentTeacher, firstname: text }) : setNewTeacher({ ...newTeacher, firstname: text })}
                        />
                        <TextInput
                            className="border border-gray-300 p-2 mb-2 rounded-md"
                            placeholder="Last Name"
                            value={currentTeacher ? currentTeacher.lastname : newTeacher.lastname}
                            onChangeText={(text) => currentTeacher ? setCurrentTeacher({ ...currentTeacher, lastname: text }) : setNewTeacher({ ...newTeacher, lastname: text })}
                        />
                        <TextInput
                            className="border border-gray-300 p-2 mb-2 rounded-md"
                            placeholder="Email"
                            value={currentTeacher ? currentTeacher.email : newTeacher.email}
                            onChangeText={(text) => currentTeacher ? setCurrentTeacher({ ...currentTeacher, email: text }) : setNewTeacher({ ...newTeacher, email: text })}
                        />
                        <TextInput
                            className="border border-gray-300 p-2 mb-2 rounded-md"
                            placeholder="Address"
                            value={currentTeacher ? currentTeacher.address : newTeacher.address}
                            onChangeText={(text) => currentTeacher ? setCurrentTeacher({ ...currentTeacher, address: text }) : setNewTeacher({ ...newTeacher, address: text })}
                        />
                        <TextInput
                            className="border border-gray-300 p-2 mb-2 rounded-md"
                            placeholder="Username"
                            value={currentTeacher ? currentTeacher.username : newTeacher.username}
                            onChangeText={(text) => currentTeacher ? setCurrentTeacher({ ...currentTeacher, username: text }) : setNewTeacher({ ...newTeacher, username: text })}
                        />
                        <TextInput
                            className="border border-gray-300 p-2 mb-2 rounded-md"
                            placeholder="Password"
                            secureTextEntry
                            value={currentTeacher ? currentTeacher.password : newTeacher.password}
                            onChangeText={(text) => currentTeacher ? setCurrentTeacher({ ...currentTeacher, password: text }) : setNewTeacher({ ...newTeacher, password: text })}
                        />
                        <TextInput
                            className="border border-gray-300 p-2 mb-2 rounded-md"
                            placeholder="Mobile Number"
                            value={currentTeacher ? currentTeacher.mobileNumber : newTeacher.mobileNumber}
                            onChangeText={(text) => currentTeacher ? setCurrentTeacher({ ...currentTeacher, mobileNumber: text }) : setNewTeacher({ ...newTeacher, mobileNumber: text })}
                        />
                        <TextInput
                            className="border border-gray-300 p-2 mb-2 rounded-md"
                            placeholder="National ID"
                            value={currentTeacher ? currentTeacher.nationalId : newTeacher.nationalId}
                            onChangeText={(text) => currentTeacher ? setCurrentTeacher({ ...currentTeacher, nationalId: text }) : setNewTeacher({ ...newTeacher, nationalId: text })}
                        />
                        <TextInput
                            className="border border-gray-300 p-2 mb-2 rounded-md"
                            placeholder="Date of Birth (YYYY-MM-DD)"
                            value={currentTeacher ? currentTeacher.dateOfBirth : newTeacher.dateOfBirth}
                            onChangeText={(text) => currentTeacher ? setCurrentTeacher({ ...currentTeacher, dateOfBirth: text }) : setNewTeacher({ ...newTeacher, dateOfBirth: text })}
                        />
                        
                        {/* Updated Picker for Gender */}
                        <Picker
                            selectedValue={currentTeacher ? currentTeacher.gender : newTeacher.gender}
                            onValueChange={(itemValue) => currentTeacher ? setCurrentTeacher({ ...currentTeacher, gender: itemValue }) : setNewTeacher({ ...newTeacher, gender: itemValue })}
                            style={{ height: 50, width: '100%', marginBottom: 16 }}
                        >
                            <Picker.Item label="Male" value="MALE" />
                            <Picker.Item label="Female" value="FEMALE" />
                        </Picker>

                        <TouchableOpacity
                            onPress={currentTeacher ? handleEditTeacher : handleCreateTeacher}
                            className="bg-blue-500 p-3 rounded-md mt-4"
                        >
                            <Text className="text-white text-center">{currentTeacher ? 'Update Teacher' : 'Create Teacher'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false);
                                resetForm();
                                setCurrentTeacher(null);
                            }}
                            className="p-2 rounded-md mt-4"
                        >
                            <Text className="text-red-500 text-center">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default ManageTeachers;

const styles = StyleSheet.create({
    // You can add your styles here
});
