import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import apiClient from '../../../../../utils/apiClient';


const Excercise = ({ title, grade, subject, score }) => {
    
    return (
      <View className="flex flex-row justify-between border-b items-center border-gray-200  w-full py-3">
        <View className="flex flex-row items-center gap-x-2">
          <View className="flex flex-col">
            <Text className="text-lg text-gray-800">{title}</Text>
            <Text className="text-sm text-gray-500">{subject}</Text>
          </View>
        </View>
        {/* if score is less than 50 put red style else put green */}
        <Text className={`text-lg font-bold ${parseInt(score) < 50 ? 'text-red-600' : 'text-green-600'}`}>{score}</Text>
        {/* <Text className="text-lg font-bold text-blue-600">{score}</Text> */}
      </View>
    );
  };

  
const Index = () => {
    const { id } = useLocalSearchParams();
    const [subject, setSubject] = useState(null);

    const fetchSubject = async () => {
        try {
            const response = await apiClient.get(`subjects/${id}`);
            setSubject(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchSubject();
    }, [id]);

    return (
        <View>
            <Stack.Screen options={{headerTitle:'Subject Overview',headerShown:true,headerBackVisible:true}}/>
            <Text className="p-4 text-2xl font-semibold">{subject?.name}</Text>
            <View className="mt-4 bg-white  p-4">
        <Text className="text-xl font-bold text-gray-800 mb-2">Exercises</Text>

        {/* List of Exercises */}
        <Excercise title="End of Month" grade="1" subject="Pass" score="80%" />
        <Excercise title="Exercise" grade="1" subject="Fail" score="10%" />
        <Excercise title="Exercise" grade="1" subject="Pass" score="75%" />
        <Excercise title="Practice" grade="1" subject="Pass" score="85%" />
        <Excercise title="Homework" grade="1" subject="Fail" score="46%" />
        <Excercise title="Test" grade="1" subject="Pass" score="88%" />
      </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Index;
