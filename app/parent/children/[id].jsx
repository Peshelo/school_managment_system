import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
  const param = useLocalSearchParams();

  return (
    <View className="bg-slate-900 flex-1">
      {/* Stack header */}
      <Stack.Screen options={{ title: 'Child Profile' ,
      headerBackVisible: false,

      }} />
      
      {/* Student Info */}
      <View className="p-4 flex-auto  text-white">
        <Text className="text-3xl font-bold text-white">Kundai Ka</Text>
        <Text className="text-md font-semibold text-white">Class 1A</Text>
        <Text className="text-md font-semibold text-white">Grade: 1</Text>
      </View>

      {/* Exercises Section */}
      <View className="mt-4 bg-white rounded-t-3xl p-4">
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
    </View>
  );
};

const styles = StyleSheet.create({});

export default Id;
