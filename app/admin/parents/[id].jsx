import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import apiClient from '../../../utils/apiClient';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Id = () => {
    const { id } = useLocalSearchParams();
    const [parent, setParent] = useState(null); // Initialize as null to handle loading state

    const fetchParent = async () => {
        
        const token = await SecureStore.getItemAsync('token');
        try{
            const response = await apiClient.get(`parents/${id}`);
            setParent(response);
            console.log(response);
        }catch(error){
            console.error(error);
        }
    }
    useEffect(() => {
        fetchParent();
    },[id]);
    return (
        <View className="p-4">
            <Stack.Screen options={{ headerTitle: 'Parent Profile' }} />
            <Text>Name: {parent?.firstname} {parent?.lastname}</Text>
            <Text>Email: {parent?.email}</Text>
            <Text>Mobile No.: {parent?.mobileNumber}</Text>
            <Text>Children: {parent?.children?.length}</Text>
            <View className="mt-4">
                <Text className="text-xl font-semibold mb-2">Children</Text>
                <FlatList
                    data={parent?.students}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => router.push(`/admin/children/${item.id}`)}>
                            <View className="flex-row items-center justify-between p-2 border-b border-gray-400">
                                <Text>{item.firstname} {item.lastname}</Text>
                                <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    )}>

                    </FlatList>
            </View>
        </View>
    );
}

export default Id;
