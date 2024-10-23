import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import apiClient from '../../../utils/apiClient';
import { Stack, useRouter } from 'expo-router';
import { useActionSheet } from '@expo/react-native-action-sheet';


const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentClass, setCurrentClass] = useState(null);
    const router = useRouter();
    const [newClass, setNewClass] = useState({
        name: '',
        description: '',
        academicYearId: 1,
        schoolId: 1
    });
    const { showActionSheetWithOptions } = useActionSheet();


    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        const token = await SecureStore.getItemAsync('token');

        try {
            const response = await apiClient.getAuthorized('classes', token);
            setClasses(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteClass = async (classId) => {
        const token = await SecureStore.getItemAsync('token');

        try {
            await apiClient.delete(`classes/${classId}`, token);
            Alert.alert('Success', 'Class deleted successfully!');
            fetchClasses();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to delete class.');
        }
    };

    const handleCreateClass = async () => {
        const token = await SecureStore.getItemAsync('token');

        try {
            await apiClient.post('classes', newClass, token);
            Alert.alert('Success', 'Class created successfully!');
            fetchClasses();
            setModalVisible(false);
            resetForm();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to create class.');
        }
    };

    const resetForm = () => {
        setNewClass({
            name: '',
            description: '',
            academicYearId: 1,
            schoolId: 1
        });
    };

    const renderClassItem = ({ item }) => (
        <TouchableOpacity onPress={() => console.log("Open Class Profile")} className="border-b border-gray-300 mx-1 rounded-md p-4 flex-row items-center">
            <View className="flex-1">
                <Text className="font-bold">{item.name}</Text>
                <Text>{item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => openActionSheet(item)} className="flex-row">
                <MaterialCommunityIcons name="dots-vertical" size={24} color="gray" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const openActionSheet = (classItem) => {
        setCurrentClass(classItem);
        const options = ['View', 'Edit', 'Delete', 'Cancel'];
        const destructiveButtonIndex = 2;
        const cancelButtonIndex = 3;

        showActionSheetWithOptions({
            options,
            title: 'Class Actions',
            destructiveButtonIndex,
            cancelButtonIndex,
        },
        (buttonIndex) => {
            if (buttonIndex === 0) {
                router.push(`/admin/classes/${classItem.id}`);
            }
            if (buttonIndex === 1) {
                setCurrentClass(classItem);
                setModalVisible(true);
            }
            if (buttonIndex === 2) {
                handleDeleteClass(classItem.id);
            }
        });
    };

    return (
        <View className="flex-1 bg-white">
            <Stack.Screen
                options={{
                    title: "Manage Classes",
                    headerBackVisible: false,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => setModalVisible(true)} className="p-2 rounded-md">
                            <MaterialCommunityIcons name="plus-box" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <FlatList
                data={classes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderClassItem}
                contentContainerStyle={{ paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
            />

            {/* Modal for Adding/Editing Class */}
            <AddClassModal
                visible={modalVisible}
                onClose={() => { setCurrentClass(null); setModalVisible(false); }}
                currentClass={currentClass}
                setCurrentClass={(values) => setCurrentClass(values)}
                refresh={fetchClasses}
            />
        </View>
    );
};

const AddClassModal = ({ visible, onClose, currentClass, setCurrentClass, refresh }) => {

    const handleEditClass = async () => {
        const token = await SecureStore.getItemAsync('token');

        try {
            await apiClient.put(`classes/${currentClass.id}`, currentClass, token);
            Alert.alert('Success', 'Class updated successfully!');
            refresh();
            onClose();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update class.');
        }
    };

    const [newClass, setNewClass] = useState({
        name: '',
        description: '',
        academicYearId: 1,
        schoolId: 1,
    });

    const handleCreateClass = async () => {
        const token = await SecureStore.getItemAsync('token');

        try {
            await apiClient.post('classes', newClass, token);
            Alert.alert('Success', 'Class created successfully!');
            refresh();
            onClose();
            resetForm();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to create class.');
        }
    };

    const resetForm = () => {
        setNewClass({
            name: '',
            description: '',
            academicYearId: 1,
            schoolId: 1,
        });
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <View className="flex flex-row justify-between p-4 items-center">
                <Text className="text-xl font-bold text-center">{currentClass ? 'Edit Class' : 'Create Class'}</Text>
                <TouchableOpacity className="text-center" onPress={onClose}>
                    <MaterialCommunityIcons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View className="p-4">
                <TextInput
                    className="border border-gray-300 p-2 mb-2 rounded-md"
                    placeholder="Class Name"
                    value={currentClass ? currentClass.name : newClass.name}
                    onChangeText={(text) => currentClass ? setCurrentClass({ ...currentClass, name: text }) : setNewClass({ ...newClass, name: text })}
                />
                <TextInput
                    className="border border-gray-300 p-2 mb-2 rounded-md"
                    placeholder="Class Description"
                    value={currentClass ? currentClass.description : newClass.description}
                    onChangeText={(text) => currentClass ? setCurrentClass({ ...currentClass, description: text }) : setNewClass({ ...newClass, description: text })}
                />
                <TouchableOpacity className="my-2 w-full bg-blue-500 rounded-lg p-4" onPress={currentClass ? handleEditClass : handleCreateClass}>
                    <Text className="w-full text-center text-semibold text-white">{currentClass ? 'Update Class' : 'Create Class'}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ManageClasses;
