import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import apiClient from '../../../utils/apiClient';
import { Stack, useRouter } from 'expo-router';
import { useActionSheet } from '@expo/react-native-action-sheet';

const ManageSubjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [newSubject, setNewSubject] = useState({ name: '', description: '' });
    const router = useRouter();
    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        const token = await SecureStore.getItemAsync('token');

        try {
            const response = await apiClient.getAuthorized('subjects', token);
            setSubjects(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteSubject = async (subjectId) => {
        const token = await SecureStore.getItemAsync('token');

        try {
            await apiClient.delete(`subjects/${subjectId}`, token);
            Alert.alert('Success', 'Subject deleted successfully!');
            fetchSubjects();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to delete subject.');
        }
    };

    const handleCreateSubject = async () => {
        const token = await SecureStore.getItemAsync('token');

        try {
            await apiClient.post('subjects', newSubject, token);
            Alert.alert('Success', 'Subject created successfully!');
            fetchSubjects();
            setModalVisible(false);
            resetForm();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to create subject.');
        }
    };

    const handleEditSubject = async () => {
        const token = await SecureStore.getItemAsync('token');

        try {
            await apiClient.put(`subjects/${currentSubject.id}`, currentSubject, token);
            Alert.alert('Success', 'Subject updated successfully!');
            fetchSubjects();
            setModalVisible(false);
            setCurrentSubject(null);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update subject.');
        }
    };

    const resetForm = () => {
        setNewSubject({ name: '', description: '' });
    };

    const openActionSheet = (subjectItem) => {
        setCurrentSubject(subjectItem);
        const options = ['View', 'Edit', 'Delete', 'Cancel'];
        const destructiveButtonIndex = 2;
        const cancelButtonIndex = 3;

        showActionSheetWithOptions({
            options,
            title: 'Subject Actions',
            destructiveButtonIndex,
            cancelButtonIndex,
        },
        (buttonIndex) => {
            if (buttonIndex === 0) {
                router.push(`/admin/subjects/${subjectItem.id}`); // Redirect to subject details
            }
            if (buttonIndex === 1) {
                setModalVisible(true);
            }
            if (buttonIndex === 2) {
                handleDeleteSubject(subjectItem.id);
            }
        });
    };

    const renderSubjectItem = ({ item }) => (
        <TouchableOpacity onPress={() => openActionSheet(item)} className="border-b border-gray-300 mx-1 rounded-md p-4 flex-row items-center">
            <View className="flex-1">
                <Text className="font-bold">{item.name}</Text>
                <Text>{item.description}</Text>
            </View>
            <TouchableOpacity className="flex-row">
                <MaterialCommunityIcons name="dots-vertical" size={24} color="gray" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-white">
            <Stack.Screen
                options={{
                    title: "Manage Subjects",
                    headerBackVisible: false,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => setModalVisible(true)} className="p-2 rounded-md">
                            <MaterialCommunityIcons name="plus-box" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <FlatList
                data={subjects}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderSubjectItem}
                contentContainerStyle={{ paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
            />

            {/* Modal for Adding/Editing Subject */}
            <AddSubjectModal
                visible={modalVisible}
                onClose={() => { setCurrentSubject(null); setModalVisible(false); }}
                currentSubject={currentSubject}
                setCurrentSubject={(values) => setCurrentSubject(values)}
                refresh={fetchSubjects}
            />
        </View>
    );
};

const AddSubjectModal = ({ visible, onClose, currentSubject, setCurrentSubject, refresh }) => {
    const [newSubject, setNewSubject] = useState({
        name: '',
        description: '',
    });

    const resetForm = () => {
        setNewSubject({
            name: '',
            description: '',
        });
    };

    useEffect(() => {
        if (currentSubject) {
            setNewSubject({ name: currentSubject.name, description: currentSubject.description });
        } else {
            resetForm();
        }
    }, [currentSubject]);

    const handleSubmit = async () => {
        if (currentSubject) {
            await handleEditSubject();
        } else {
            await handleCreateSubject();
        }
    };

    const handleEditSubject = async () => {
        const token = await SecureStore.getItemAsync('token');

        try {
            await apiClient.put(`subjects/${currentSubject.id}`, newSubject, token);
            Alert.alert('Success', 'Subject updated successfully!');
            refresh();
            onClose();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update subject.');
        }
    };

    const handleCreateSubject = async () => {
        const token = await SecureStore.getItemAsync('token');

        try {
            await apiClient.post('subjects', newSubject, token);
            Alert.alert('Success', 'Subject created successfully!');
            refresh();
            onClose();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to create subject.');
        }
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <View className="flex flex-row justify-between p-4 items-center">
                <Text className="text-xl font-bold text-center">{currentSubject ? 'Edit Subject' : 'Create Subject'}</Text>
                <TouchableOpacity className="text-center" onPress={onClose}>
                    <MaterialCommunityIcons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View className="p-4">
                <TextInput
                    className="border border-gray-300 p-2 mb-2 rounded-md"
                    placeholder="Subject Name"
                    value={newSubject.name}
                    onChangeText={(text) => setNewSubject({ ...newSubject, name: text })}
                />
                <TextInput
                    className="border border-gray-300 p-2 mb-2 rounded-md"
                    placeholder="Subject Description"
                    value={newSubject.description}
                    onChangeText={(text) => setNewSubject({ ...newSubject, description: text })}
                />
                <TouchableOpacity className="my-2 w-full bg-blue-500 rounded-lg p-4" onPress={handleSubmit}>
                    <Text className="w-full text-center text-semibold text-white">{currentSubject ? 'Update Subject' : 'Create Subject'}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ManageSubjects;
