import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import apiClient from '../../../utils/apiClient';
import * as SecureStore from 'expo-secure-store';
import { FlatList } from 'react-native-gesture-handler';

const Id = () => {
    const { id } = useLocalSearchParams();
    const [teacher, setTeacher] = useState(null); // Initialize as null to handle loading state
    const [loading, setLoading] = useState(true); // Loading state

    const fetchProfile = async () => {
        const token = await SecureStore.getItemAsync('token');

        try {
            console.log(token);
            const data = await apiClient.getAuthorized(`teachers/${id}`, token);
            setTeacher(data); // Set fetched teacher data
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Stop loading after fetch
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [id]); // Add id as a dependency in case it changes

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text>Loading teacher profile...</Text>
            </View>
        );
    }

    if (!teacher) {
        return (
            <View style={styles.centered}>
                            <Stack.Screen options={{ headerTitle: 'Teacher Profile' }} />

                <Text>No teacher found with ID {id}</Text>
            </View>
        );
    }

    return (
        <View className="p-4">
            <Stack.Screen options={{ headerTitle: 'Teacher Profile' }} />
            <Text style={styles.label}>Teacher ID: {teacher?.id}</Text>
            <Text style={styles.label}>Firstname: {teacher?.firstname}</Text>
            <Text style={styles.label}>Lastname: {teacher?.lastname}</Text>
            <Text style={styles.label}>Gender: {teacher?.gender}</Text>
            <Text style={styles.label}>Mobile No.: {teacher?.mobileNumber}</Text>
            <Text style={styles.label}>Email: {teacher?.email}</Text>
            <Text style={styles.label}>National ID: {teacher?.nationalId}</Text>

            <Text style={styles.label} className="my-4 font-semibold">Teacher Subject Class</Text>
            {/* Teach subject class */}
            {/* {
  "id": 3,
  "firstname": "string",
  "lastname": "string",
  "email": "string@gmail.com",
  "mobileNumber": "string",
  "address": "string",
  "gender": "MALE",
  "nationalId": "string",
  "dateOfBirth": "2024-10-07",
  "school": {
    "id": 1,
    "name": "Zrp High School",
    "address": "NO 415 Hatclief Harare",
    "email": null,
    "mobileNumber": null,
    "landlineNumber": null,
    "schoolClasses": null,
    "teachers": null
  },
  "teacherSubjectClasses": [
    {
      "id": 2,
      "teacher": null,
      "subject": {
        "id": 2,
        "name": "Shona Language"
      },
      "schoolClass": {
        "id": 7,
        "name": "1A",
        "description": "",
        "year": null,
        "school": null,
        "students": null,
        "subjects": null
      }
    }
  ]
} */}
    {/* <FlatList for teacher subject class */}
    {teacher?.teacherSubjectClasses ?
     <FlatList data={teacher?.teacherSubjectClasses} renderItem={({ item }) => (
        <View className="flex-row items-center justify-between p-2 border-b border-gray-400">
            <Text>{item?.subject?.name}</Text>
            <Text>{item?.schoolClass?.name}</Text>
            </View>
        )} /> : <Text>No classes found</Text>}

   


        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default Id;
