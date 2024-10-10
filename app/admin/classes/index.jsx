import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import axios from 'axios';
import TopNavBar from '@/components/navigation/TopNavBar';
import * as SecureStore from 'expo-secure-store';
import { Link } from 'expo-router';

const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentClass, setCurrentClass] = useState(null);
    const [newClass, setNewClass] = useState({ name: '', description: '', academicYearId: 1, schoolId: 1 });
    const [token, setToken] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            const retrievedToken = await SecureStore.getItemAsync('token');
            setToken(retrievedToken);
        };
        
        getToken();
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://192.168.181.28:8080/api/classes');
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error.response?.data || error.message);
        }
    };

    const handleSearch = () => {
        if (searchTerm) {
            const filteredClasses = classes.filter(cls =>
                cls.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setClasses(filteredClasses);
        } else {
            fetchClasses(); // Reset to original list if search term is cleared
        }
    };

    const handleCreateClass = async () => {
        try {
            const data = {
                name: newClass.name,
                description: newClass.description,
                academicYear: {
                    id: newClass.academicYearId
                },
                school: {
                    id: newClass.schoolId
                }
            };
            await axios.post('http://192.168.181.28:8080/api/classes', data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            Alert.alert('Success', 'Class created successfully!');
            fetchClasses();
            setModalVisible(false);
            setNewClass({ name: '', description: '', academicYearId: 1, schoolId: 1 });
        } catch (error) {
            console.error('Error creating class:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to create class.');
        }
    };

    const handleDeleteClass = async (classId) => {
        try {
            await axios.delete(`http://192.168.181.28:8080/api/classes/${classId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            Alert.alert('Success', 'Class deleted successfully!');
            fetchClasses();
        } catch (error) {
            console.error('Error deleting class:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to delete class.');
        }
    };

    const handleEditClass = async () => {
        try {
            const updatedClass = {
                ...currentClass,
                academicYear: {
                    id: currentClass.academicYearId
                },
                school: {
                    id: currentClass.schoolId
                }
            };
            await axios.put(`http://192.168.181.28:8080/api/classes/${currentClass.id}`, updatedClass, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            Alert.alert('Success', 'Class updated successfully!');
            fetchClasses();
            setModalVisible(false);
            setCurrentClass(null);
        } catch (error) {
            console.error('Error updating class:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to update class.');
        }
    };

    return (
        <View className="flex-1 bg-white">
            <View className="p-4">
                <Text className="text-xl font-bold mb-4">Manage Classes</Text>

                <TouchableOpacity onPress={() => setModalVisible(true)} className="bg-green-500 p-3 rounded-md mb-4">
                    <Text className="text-white text-center">Create New Class</Text>
                </TouchableOpacity>
                <View className="mb-4 flex-row">
                    <TextInput
                        className="border border-gray-300 p-2 rounded-md flex-1"
                        placeholder="Search Classes"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <TouchableOpacity onPress={handleSearch} className="ml-2 bg-gray-700 p-2 rounded-md">
                        <Text className="text-white">Search</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
    data={classes}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => ( 
        <Link href={`/admin/classes/7`} className="border-b border-gray-300 p-4 flex-row justify-between items-center">
            <Text className="font-semibold">{item.name}</Text>
            <Text className="text-xs text-gray-400">{item.description} This is a dummy description...</Text>
            <View className="flex-row">
                <TouchableOpacity onPress={() => { setCurrentClass(item); setModalVisible(true); }} className="p-2 rounded-md mr-2">
                    <Text className="text-blue-500">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteClass(item.id)} className="p-2 rounded-md">
                    <Text className="text-red-500">Delete</Text>
                </TouchableOpacity>
            </View>
        </Link>
    )}
    contentContainerStyle={{ paddingBottom: 20 }} // Optional: adds padding at the bottom
    showsVerticalScrollIndicator={false} // Optional: hides the scroll indicator
/>


                {/* Modal for Adding/Editing Class */}
                <Modal visible={modalVisible} animationType="slide">
                    <View className="p-4">
                        <Text className="text-xl font-bold mb-4 text-center">
                            {currentClass ? 'Edit Class' : 'Create Class'}
                        </Text>

                        <TextInput
                            className="border border-gray-300 p-2 mb-4 rounded-md"
                            placeholder="Class Name"
                            value={currentClass ? currentClass.name : newClass.name}
                            onChangeText={(text) => currentClass ? setCurrentClass({ ...currentClass, name: text }) : setNewClass({ ...newClass, name: text })}
                        />
                        <TextInput
                            className="border border-gray-300 p-2 mb-4 rounded-md"
                            placeholder="Description"
                            value={currentClass ? currentClass.description : newClass.description}
                            onChangeText={(text) => currentClass ? setCurrentClass({ ...currentClass, description: text }) : setNewClass({ ...newClass, description: text })}
                        />

                        <TouchableOpacity
                            onPress={currentClass ? handleEditClass : handleCreateClass}
                            className="bg-gray-700 p-3 rounded-md mb-4"
                        >
                            <Text className="text-white text-center">{currentClass ? 'Update Class' : 'Create Class'}</Text>
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

export default ManageClasses;
