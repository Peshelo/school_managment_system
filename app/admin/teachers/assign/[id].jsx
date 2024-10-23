import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import apiClient from '../../../../utils/apiClient';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Id = () => {
  const { id } = useLocalSearchParams();
  const [teacher, setTeacher] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [academicYearId, setAcademicYearId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subjectId, setSubjectId] = useState(null);
  const [classId, setClassId] = useState(null);
  const router = useRouter();

  const fetchTeacher = async () => {
    try {
      const response = await apiClient.get(`teachers/${id}`);
      setTeacher(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

  const fetchClasses = async () => {
    try {
      const response = await apiClient.get('classes');
      setClasses(response);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchAcademicYear = async () => {
    const token = await SecureStore.getItemAsync('token');
    try {
      const response = await apiClient.getAuthorized('academic-year', token);
      setAcademicYear(response);
    } catch (error) {
      console.error(error);
    }
  }

  const assignTeacher = async () => {
    // Error checking
    if (!subjectId) {
      alert('Please select a subject');
      return;
    }
    if (!classId) {
      alert('Please select a class');
      return;
    }
    if (!academicYearId) {
      alert('Please select an academic year');
      return;
    }
    const token = await SecureStore.getItemAsync('token');
    try {
      const response = await apiClient.post('teacher-subject-class', {
        teacher: {
          id: id
        },
        subject: {
          id: subjectId
        },
        schoolClass: { id: classId },
        academicYear: { 
          id: academicYearId
         },
      }, token);
      Alert.alert('Success', 'Teacher assigned successfully');
      router.push('/admin/teachers/'+id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTeacher();
    fetchSubjects();
    fetchAcademicYear();
    fetchClasses();
  }, [id]);

  // const assignTeacher = async () => {
  //   try {
  //     const response = await apiClient.post('teachers/assign', {
  //       teacherId: id,
  //       subjectId: subjectId,
  //       classId: classId,
  //       academicYearId: academicYearId,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  return (
    <View className="p-4">
      <Stack.Screen options={{ headerTitle: 'Assign teacher to class' }} />
      <Text className="text-lg font-bold my-2">Teacher Name: {teacher?.firstname} {teacher?.lastname}</Text>
      <Text className="text-md my-2">Subject</Text>
      <RNPickerSelect
        items={subjects.map(subject => ({
          label: subject.name, // Set the label to the subject name
          value: subject.id,   // Set the value to the subject id
        }))}
        onValueChange={(itemValue) => setSubjectId(itemValue)}
        placeholder={{ label: 'Select a subject...', value: null }} // Optional placeholder
      />
      <Text className="text-md my-2">Class</Text>
      <RNPickerSelect
        items={classes.map(myclass => ({
          label: myclass.name, // Set the label to the subject name
          value: myclass.id,   // Set the value to the subject id
        }))}
        onValueChange={(itemValue) => setClassId(itemValue)}
        placeholder={{ label: 'Select a class...', value: null }} // Optional placeholder
      />
      <Text className="text-md my-2">Academic Year</Text>
      <RNPickerSelect
        items={academicYear.map(year => ({
          label: year.year, // Set the label to the subject name
          value: year.id,   // Set the value to the subject id
        }))}
        onValueChange={(itemValue) => setAcademicYearId(itemValue)}
        placeholder={{ label: 'Select academic year...', value: null }} // Optional placeholder
      />
      <TouchableOpacity onPress={assignTeacher} className="bg-blue-500 text-white p-2 py-4 rounded-md my-4">
        <Text className="w-full text-center font-semibold text-white">Assign</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({})

export default Id;
