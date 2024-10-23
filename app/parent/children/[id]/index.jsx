import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
// import apiClient from '../../../../../utils/apiClient';
import apiClient from '../../../../utils/apiClient';
import * as SecureStore from 'expo-secure-store';


// Dynamic icons based on subject
const getIconForSubject = (subject) => {
  switch (subject) {
    case 'Mathematics':
      return 'calculator';
    case 'English':
      return 'book-open-variant';
    case 'Science':
      return 'flask-outline';
    default:
      return 'book-outline';
  }
};

const Excercise = ({ title, grade, subject, score }) => {
  const iconName = getIconForSubject(subject);
  
  return (
    <View className="flex flex-row justify-between border-b items-center border-gray-200  w-full py-3">
      <View className="flex flex-row items-center gap-x-2">
        <MaterialCommunityIcons name={iconName} size={29} color="black" />
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

const Id = () => {
  const {id} = useLocalSearchParams();
  const [student, setStudent] = useState(null); // Initialize as null to handle loading state
  const [exercises, setExercises] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const fetchStudent = async () => {
      try{
          const response = await apiClient.get(`students/${id}`);
          setStudent(response);
          console.log(response);
      }catch(error){
          console.error(error);
      }
  }
  const fetchExercises = async () => {
    const token = await SecureStore.getItemAsync('token');
    try {
      const response = await apiClient.getAuthorized('exercises',token);
      setExercises(response);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchSubjects = async () => {
    try {
      const response = await apiClient.get('subjects');
      setSubjects(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
      fetchExercises();
      fetchSubjects();
      fetchStudent();
  },[id]);

  return (
    <View className="flex-1">
            <ScrollView className="">

      {/* Stack header */}
      <Stack.Screen options={{ title: 'Child Profile' ,
      headerShown: true,
      headerBackVisible: false,
      headerRight: () => (
        <Link href="/parent/" className="text-white">
        <MaterialCommunityIcons name="swap-horizontal" size={24} color="white" />
        </Link>
      )

      }} />
      
      {/* Student Info */}
      <View className="p-4 flex-auto ">
        <Text className="text-3xl font-bold ">Name: {student?.firstname} {student?.lastname}</Text>
        <Link href={'/admin/subjects'} className="text-md font-semibold">Class {student?.assignedClass?.name}</Link>
      </View>

      {/* Exercises Section */}
      <View className="mt-4 bg-white  p-4">
        <Text className="text-xl font-bold text-gray-800 mb-2">Subjects</Text>

        {/* List of Exercises */}
        <FlatList data={subjects} keyExtractor={(item) => item.id} renderItem={({ item }) => (
          <Link href={'./subjects/'+item.id} className="flex flex-row justify-between border-b items-center border-gray-200  w-full py-3">
            <View className="flex flex-row justify-center items-center gap-x-2">
              {/* <MaterialCommunityIcons name="book-open-variant" size={29} color="black" /> */}
              <View className="flex flex-col">
                <Text className="text-lg text-gray-800">{item.name}</Text>
                {/* <Text className="text-sm text-gray-500">{item.description}</Text> */}
              </View>
            </View>
          </Link>
        )} />
      </View>
      <View className="mt-4 bg-white  p-4">
        <Text className="text-xl font-bold text-gray-800 mb-2">Recent Exercises</Text>

        {/* List of Exercises */}
        <Excercise title="Mathematics Exam" grade="1" subject="Mathematics" score="80%" />
        <Excercise title="English Test" grade="1" subject="English" score="10%" />
        <Excercise title="Science Quiz" grade="1" subject="Science" score="75%" />
        <Excercise title="Mathematics Practice" grade="1" subject="Mathematics" score="85%" />
        <Excercise title="English Essay" grade="1" subject="English" score="46%" />
        <Excercise title="Science Project" grade="1" subject="Science" score="88%" />
        <Link href="/parent/children/1/exercises" className="text-blue-600 w-full text-center my-4">View all exercises</Link>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Id;
