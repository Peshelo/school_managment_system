import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const ClassDetails = () => {
  const route = useRoute();
  const { classId } = route.params;

  const [classDetails, setClassDetails] = useState(null);
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.40.28:8080/api/classes/${classId}`);
        setClassDetails(response.data);
      } catch (error) {
        console.error('Error fetching class details:', error);
      }
    };
    
    fetchClassDetails();
  }, [classId]);

  const onAddStudent = async (data) => {
    try {
      const parentResponse = await axios.post('http://192.168.40.28:8080/api/parents', {
        firstname: data.parentFirstname,
        lastname: data.parentLastname,
        email: data.parentEmail,
        address: data.parentAddress,
        username: data.parentUsername,
        password: data.parentPassword,
        gender: data.parentGender,
        mobileNumber: data.parentMobileNumber,
        nationalId: data.parentNationalId,
        dateOfBirth: data.parentDateOfBirth,
        relationToChild: data.relationToChild,
      });

      const studentResponse = await axios.post('http://192.168.40.28:8080/api/students', {
        firstname: data.firstname,
        middlename: data.middlename,
        lastname: data.lastname,
        email: data.email,
        address: data.address,
        mobileNumber: data.mobileNumber,
        nationalId: data.nationalId,
        parent: {
          id: parentResponse.data.id, // Use the created parent's ID
        },
        assignedClass: {
          id: classDetails.id,
        },
        status: 'ACTIVE',
        dateOfBirth: data.dateOfBirth,
        enrollmentDate: new Date().toISOString(), // Use current date for enrollment
      });

      Alert.alert('Success', 'Student added successfully');
      reset(); // Reset form fields after submission
    } catch (error) {
      console.error('Error adding student:', error);
      Alert.alert('Error', 'Failed to add student');
    }
  };

  if (!classDetails) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-4">
      <Text className="text-lg font-bold">{classDetails.name}</Text>
      <Text>{classDetails.description || 'No description available'}</Text>
      <Text>{`School: ${classDetails.school.name}`}</Text>

      <Text className="mt-4 text-lg font-semibold">Add Student</Text>
      
      <Controller
        control={control}
        name="firstname"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="First Name"
            className="border p-2 rounded"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="middlename"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Middle Name"
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="lastname"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Last Name"
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Address"
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="mobileNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Mobile Number"
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="nationalId"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="National ID"
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="parentFirstname"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Parent First Name"
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="parentLastname"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Parent Last Name"
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="parentEmail"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Parent Email"
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="parentUsername"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Parent Username"
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="parentPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Parent Password"
            secureTextEntry
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="parentMobileNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Parent Mobile Number"
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="relationToChild"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Relation to Child"
            className="border p-2 rounded mt-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button title="Add Student" onPress={handleSubmit(onAddStudent)} />
    </ScrollView>
  );
};

export default ClassDetails;
