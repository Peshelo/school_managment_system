import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import apiClient from '../../../utils/apiClient';
import * as SecureStore from 'expo-secure-store';
import { FlatList } from 'react-native-gesture-handler';

const ClassProfile = () => {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState(null); // Initialize as null to handle loading state
    const [loading, setLoading] = useState(true); // Loading state

    const fetchClass = async () => {
        const token = await SecureStore.getItemAsync('token');

        try {
            const response = await apiClient.getAuthorized(`classes/${id}`, token);
            setData(response); // Set fetched data
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Stop loading after fetch
        }
    };

    useEffect(() => {
        fetchClass();
    }, [id]); // Add id as a dependency in case it changes

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text>Loading class profile...</Text>
            </View>
        );
    }

    if (!data) {
        return (
            <View style={styles.centered}>
                <Stack.Screen options={{ headerTitle: 'Class Profile' }} />
                <Text>No class found with ID {id}</Text>
            </View>
        );
    }

    return (
        <View style={{ padding: 16 }}>
            <Stack.Screen options={{ headerTitle: 'Class Profile' }} />
            <Text style={styles.label}>Class: {data?.name}</Text>
            <Text style={styles.label}>Year: {data?.year}</Text>
            <Text style={styles.label}>School: {data?.school?.name}</Text>
            <Text style={styles.label}>No. of students: {data?.students?.length}</Text>
            {/* Student flatlist */}
            <Text style={{ ...styles.label, marginTop: 16 }}>Students</Text>
            {data?.students ? <FlatList
                data={data?.students}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link href={'/admin/student/'+item?.id} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text>{item.firstname} {item.lastname}</Text>
                    </Link>
                )} /> : <Text>No students found</Text>}

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

export default ClassProfile;
