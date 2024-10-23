import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import apiClient from '../../../utils/apiClient';
import * as SecureStore from 'expo-secure-store';

const Id = () => {
    const { id } = useLocalSearchParams();
    const [student, setStudent] = useState(null); // Initialize as null to handle loading state
    const [loading, setLoading] = useState(true); // Loading state

    const fetchStudent = async () => {

        try {
            const token = await SecureStore.getItemAsync('token');

            const response = await apiClient.getAuthorized(`students/${id}`, token);
            console.log(response);
            setStudent(response); // Set fetched student data
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Stop loading after fetch
        }
    }

    useEffect(() => {
        fetchStudent();
    }
    , [id]); // Add id as a dependency in case it changes

    return (
        <View className="p-4">
            <Stack.Screen options={{ headerTitle: 'Student Profile' }} />
            <Text>Name: {student?.firstname} {student?.lastname}</Text>
            <Text>Email: {student?.email}</Text>
            <Text>D.O.B: {student?.mobileNumber}</Text>
            <Text>Date Enrolled: {student?.enrollmentDate}</Text>
            <Text className="my-4 font-semibold text-xl">Class</Text>
            {student?.assignedClass ? <Link className='p-2 py-4 border rounded-lg border-gray-400' href={'/admin/classes/'+student?.assignedClass?.id}>Class: {student?.assignedClass?.name}</Link>
            : <Text className='p-2 border rounded-lg border-gray-400'>No class assigned</Text>}
        </View>
    );
}

const styles = StyleSheet.create({})

export default Id;
