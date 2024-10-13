import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import TopNavBar from '@/components/navigation/TopNavBar';

const ManageSubjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [newSubject, setNewSubject] = useState({ name: '', description: '' });
    const token = SecureStore.getItemAsync('token');

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://192.168.167.28:8080/api/subjects', {
                headers: {
                    "Authorization": `Bearer ${await token}`
                }
            });
            setSubjects(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = () => {
        if (searchTerm) {
            const filteredSubjects = subjects.filter(sub =>
                sub.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSubjects(filteredSubjects);
        } else {
            fetchSubjects(); // Reset to original list if search term is cleared
        }
    };

    const handleCreateSubject = async () => {
        try {
            await axios.post('http://192.168.167.28:8080/api/subjects', newSubject, {
                headers: {
                    "Authorization": `Bearer ${await token}`
                }
            });
            Alert.alert('Success', 'Subject created successfully!');
            fetchSubjects();
            setModalVisible(false);
            setNewSubject({ name: '', description: '' });
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to create subject.');
        }
    };

    const handleDeleteSubject = async (subjectId) => {
        try {
            await axios.delete(`http://192.168.167.28:8080/api/subjects/${subjectId}`, {
                headers: {
                    "Authorization": `Bearer ${await token}`
                }
            });
            Alert.alert('Success', 'Subject deleted successfully!');
            fetchSubjects();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to delete subject.');
        }
    };

    const handleEditSubject = async () => {
        try {
            await axios.put(`http://192.168.167.28:8080/api/subjects/${currentSubject.id}`, currentSubject, {
                headers: {
                    "Authorization": `Bearer ${await token}`
                }
            });
            Alert.alert('Success', 'Subject updated successfully!');
            fetchSubjects();
            setModalVisible(false);
            setCurrentSubject(null);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update subject.');
        }
    };

    return (
        <View className="flex-1 bg-white">
            <View className="p-4">
                <Text className="text-xl font-bold mb-4">Manage Subjects</Text>

                <View className="mb-4 flex-row">
                    <TextInput
                        className="border border-gray-300 p-2 rounded-md flex-1"
                        placeholder="Search Subjects"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <TouchableOpacity onPress={handleSearch} className="ml-2 bg-gray-700 p-2 rounded-md">
                        <Text className="text-white">Search</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={subjects}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item,index }) => (
                        <View className="border-b border-gray-300 p-4 flex-row justify-between items-center">

                            <View className="flex-1">
                                <Text className="font-bold">{index+1}. {item.name}</Text>
                                <Text>{item.description}</Text>
                            </View>
                            <View className="flex-row">
                                <TouchableOpacity onPress={() => { setCurrentSubject(item); setModalVisible(true); }} className="p-2 rounded-md mr-2">
                                    <Text className="text-blue-500">Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteSubject(item.id)} className="p-2 rounded-md">
                                    <Text className="text-red-500">Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />

                <TouchableOpacity onPress={() => setModalVisible(true)} className="bg-green-500 p-3 rounded-md mt-4">
                    <Text className="text-white text-center">Create Subject</Text>
                </TouchableOpacity>

                {/* Modal for Adding/Editing Subject */}
                <Modal visible={modalVisible} animationType="slide">
                    <View className="p-4">
                        <Text className="text-xl font-bold mb-4 text-center">
                            {currentSubject ? 'Edit Subject' : 'Create Subject'}
                        </Text>

                        <TextInput
                            className="border border-gray-300 p-2 mb-2 rounded-md"
                            placeholder="Subject Name"
                            value={currentSubject ? currentSubject.name : newSubject.name}
                            onChangeText={(text) => currentSubject ? setCurrentSubject({ ...currentSubject, name: text }) : setNewSubject({ ...newSubject, name: text })}
                        />
                        <TextInput
                            className="border border-gray-300 p-2 mb-4 rounded-md"
                            placeholder="Subject Description"
                            value={currentSubject ? currentSubject.description : newSubject.description}
                            onChangeText={(text) => currentSubject ? setCurrentSubject({ ...currentSubject, description: text }) : setNewSubject({ ...newSubject, description: text })}
                        />

                        <TouchableOpacity
                            onPress={currentSubject ? handleEditSubject : handleCreateSubject}
                            className="bg-gray-700 p-3 rounded-md mb-4"
                        >
                            <Text className="text-white text-center">{currentSubject ? 'Update Subject' : 'Create Subject'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-red-500 p-3 rounded-md">
                            <Text className="text-white text-center">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // Add any custom styles here
});

export default ManageSubjects;
