import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, FlatList, Modal, Image } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker'; // Importing the new Picker
import apiClient from '../../../utils/apiClient';
import BottomSheet from '@gorhom/bottom-sheet';
import { Stack, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';

const ManageTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState(null);
    const router = useRouter();
    const [school, setSchool] = useState(null);
    const token = SecureStore.getItemAsync('token');


    const { showActionSheetWithOptions } = useActionSheet();

    const openActionSheet = (teacher) => {
        console.log(teacher);
        setCurrentTeacher(teacher);
        const options = ['View', 'Edit','Assign to class', 'Delete', 'Cancel'];
        const destructiveButtonIndex = 3;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
            options,
            title: 'Teacher Actions',
            separatorStyle: {
                color: 'gray',
            },
            useModal: true,
            message: 'Select an action to perform on the teacher',
            showSeparators: true,
            destructiveButtonIndex,
        },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    router.push(`/admin/teachers/${teacher.id}`);
                }
                if (buttonIndex === 1) {
                    setCurrentTeacher(teacher);
                    setModalVisible(true);
                }
                if (buttonIndex === 2) {
                    router.push(`/admin/teachers/assign/${teacher.id}`);
                }
                if (buttonIndex === 3) {
                    handleDeleteTeacher(teacher.id);
                }
            })

    }


    const fetchSchool = async () => {
        try {
            const response = await apiClient.getAuthorized('admin/school', await token);
            setSchool(response);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchSchool();
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await apiClient.getAuthorized('admin/teachers', await token);
            setTeachers(response);
        } catch (error) {
            console.error(error);
        }
    };






    const handleDeleteTeacher = async (teacherId) => {
        try {
            await apiClient.delete(`admin/teachers/${teacherId}`, await token);
            Alert.alert('Success', 'Teacher deleted successfully!');
            fetchTeachers();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to delete teacher.');
        }
    };





    const renderTeacherItem = ({ item }) => (
        <TouchableOpacity onPress={() => console.log("Open Teacher Profile")} className="border-b border-gray-300 mx-1 rounded-md p-4 flex-row items-center">
            {/* <MaterialCommunityIcons name="account" size={24} color="black" /> */}
            <View className="flex-1">
                <Text className="font-bold">{item.firstname} {item.lastname}</Text>
                <Text>{item.email}</Text>
            </View>
            <TouchableOpacity onPress={() => openActionSheet(item)} className="flex-row">
                {/* Action Icon */}
                <MaterialCommunityIcons name="dots-vertical" size={24} color="gray" />
            </TouchableOpacity>
        </TouchableOpacity>
    );


    const snapPoints = React.useMemo(() => ['25%', '50%'], []);
    return (
        <View className="flex-1 bg-white">
            <Stack.Screen
                options={{
                    title: "Manage Teachers",
                    headerBackVisible: false,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => setModalVisible(true)} className="p-2 rounded-md">
                            <MaterialCommunityIcons name="account-plus" size={24} color="white" />
                        </TouchableOpacity>
                    )
                }}
            />
            <FlatList
                data={teachers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTeacherItem}
                contentContainerStyle={{ paddingBottom: 80 }} // Add padding for fixed button space
                showsVerticalScrollIndicator={false} // Hides the scroll indicator
            />



            {/* Modal for Adding/Editing Teacher */}
            <AddTeacherModal schoolId={school?.id} visible={modalVisible} onClose={() => { setCurrentTeacher(null); setModalVisible(false) }} currentTeacher={currentTeacher} setCurrentTeacher={(values) => setCurrentTeacher(values)} refresh={fetchTeachers} />


            {/* <BottomSheet snapPoints={snapPoints}>
                <View className="p-4">
                    <Text>HJello</Text>
                    </View>
                </BottomSheet> */}
        </View>
    );
};



const AddTeacherModal = ({ visible, onClose, currentTeacher, setCurrentTeacher, refresh, schoolId }) => {
    const token = SecureStore.getItemAsync('token');
    const handleEditTeacher = async () => {
        try {
            await apiClient.put(`admin/teachers/${currentTeacher.id}`, currentTeacher, await token);
            Alert.alert('Success', 'Teacher updated successfully!');
            fetchTeachers();
            setModalVisible(false);
            setCurrentTeacher(null);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update teacher.');
        }
    };

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
        school: { id: schoolId },
    });

    const handleCreateTeacher = async () => {
        try {
            await apiClient.post('admin/teachers', newTeacher, await token);
            Alert.alert('Success', 'Teacher created successfully!');
            refesh()
            setModalVisible(false);
            resetForm();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to create teacher.');
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
            roles: ['TEACHER']
        });
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle='pageSheet'>
            <View className="flex flex-row justify-between p-4 items-center">
                <Text className="text-xl font-bold text-center">
                    {currentTeacher ? 'Edit Teacher' : 'Create Teacher'}
                </Text>
                <TouchableOpacity className="text-center" onPress={onClose}>
                    <MaterialCommunityIcons name="close" size={24} color="black" />
                </TouchableOpacity>

            </View>
            <View className="p-4">

                <View className="flex flex-row space-x-2">
                    <TextInput
                        className="border flex-1 border-gray-300 p-2 mb-2 rounded-md"
                        placeholder="First Name"
                        value={currentTeacher ? currentTeacher.firstname : newTeacher.firstname}
                        onChangeText={(text) => currentTeacher ? setCurrentTeacher({ ...currentTeacher, firstname: text }) : setNewTeacher({ ...newTeacher, firstname: text })}
                    />
                    <TextInput
                        className="border flex-1 border-gray-300 p-2 mb-2 rounded-md"
                        placeholder="Last Name"
                        value={currentTeacher ? currentTeacher.lastname : newTeacher.lastname}
                        onChangeText={(text) => currentTeacher ? setCurrentTeacher({ ...currentTeacher, lastname: text }) : setNewTeacher({ ...newTeacher, lastname: text })}
                    />
                </View>

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
                    className="border border-gray-300 mb-4 rounded-md"
                >
                    <Picker.Item label="Male" value="MALE" />
                    <Picker.Item label="Female" value="FEMALE" />
                    <Picker.Item label="Other" value="OTHER" />
                </Picker>
                <TouchableOpacity className="my-2 w-full bg-blue-500 rounded-lg  p-4" onPress={currentTeacher ? handleEditTeacher : handleCreateTeacher}>
                    <Text className="w-full text-center  text-semibold text-white">{currentTeacher ? 'Update Teacher' : 'Create Teacher'}</Text>
                </TouchableOpacity >
            </View>
        </Modal>
    )
}

export default ManageTeachers;
