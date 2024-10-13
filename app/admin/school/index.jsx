import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import TopNavBar from '@/components/navigation/TopNavBar';
import { Stack } from 'expo-router';

const ManageSchool = () => {
    const [schoolData, setSchoolData] = useState({
        name: '',
        address: '',
        email: '',
        mobileNumber: '',
        landlineNumber: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch current school data
        const fetchSchoolData = async () => {
            try {
                const response = await axios.get('http://192.168.167.28:8080/api/schools/1'); // Change to your actual school ID
                setSchoolData(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSchoolData();
    }, []);

    const handleInputChange = (name, value) => {
        setSchoolData({ ...schoolData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.put('http://192.168.167.28:8080/api/schools/1', schoolData); // Change to your actual school ID
            Alert.alert('Success', 'School details updated successfully!');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update school details.');
        }
    };

    if (loading) {
        return <Text>Loading...</Text>; // Show loading indicator
    }

    return (
        <View className="flex-1 bg-white">
            {/* <TopNavBar/> */}
            <View className="p-4">

            
            {/* Logo */}
            <View className="flex p-4 items-center mb-6">
                <Image 
                    source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder logo
                    style={styles.logo}
                />
            </View>

            <Text className="text-xl font-bold mb-4 text-center">Manage School</Text>
            
            <TextInput
                className="border border-gray-300 p-2 mb-4 rounded-md"
                placeholder="Name"
                value={schoolData.name}
                onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
                className="border border-gray-300 p-2 mb-4 rounded-md"
                placeholder="Address"
                value={schoolData.address}
                onChangeText={(text) => handleInputChange('address', text)}
            />
            <TextInput
                className="border border-gray-300 p-2 mb-4 rounded-md"
                placeholder="Email"
                value={schoolData.email}
                onChangeText={(text) => handleInputChange('email', text)}
            />
            <TextInput
                className="border border-gray-300 p-2 mb-4 rounded-md"
                placeholder="Mobile Number"
                value={schoolData.mobileNumber}
                onChangeText={(text) => handleInputChange('mobileNumber', text)}
                keyboardType="phone-pad"
            />
            <TextInput
                className="border border-gray-300 p-2 mb-4 rounded-md"
                placeholder="Landline Number"
                value={schoolData.landlineNumber}
                onChangeText={(text) => handleInputChange('landlineNumber', text)}
                keyboardType="phone-pad"
            />
            <TouchableOpacity 
                className="bg-gray-700 p-3 rounded-md mb-4"
                onPress={handleSubmit}
            >
                <Text className="text-white text-center">Update School</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        borderRadius: 75, // Optional: round the logo
        marginBottom: 10,
    },
});

export default ManageSchool;
