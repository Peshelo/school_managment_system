import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Stack } from 'expo-router';
import { FloatingAction } from "react-native-floating-action";
import { tailwind } from 'nativewind';

const ClassDetails = () => {
  const route = useRoute();
  const { classId } = route.params;

  const [classDetails, setClassDetails] = useState(null);
  const [students, setStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.40.28:8080/api/classes/${classId}`);
        setClassDetails(response.data);

        // Fetch students enrolled in the class
        const studentsResponse = await axios.get(`http://192.168.43.230:8080/api/students?classId=${classId}`);
        setStudents(studentsResponse.data);
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
      setModalVisible(false); // Close the modal
      setStudents([...students, studentResponse.data]); // Update the students list
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
    <View className="flex-1">
      <ScrollView className="p-4">
        <Stack.Screen options={{ title: `Class: ${classDetails.name}` }} />

        <Text className="text-lg font-semibold">Description:</Text>
        <Text>{classDetails.description || 'No description available'}</Text>

        <Text className="mt-4 text-lg font-semibold">Class Statistics:</Text>
        <Text>Total Students: {students.length}</Text>

        <Text className="mt-4 text-lg font-semibold">List of Students:</Text>
        {students.length === 0 ? (
          <Text>No students enrolled in this class.</Text>
        ) : (
          students.map((student) => (
            <Text key={student.id} className="mt-1">
              {student.firstname} {student.lastname}
            </Text>
          ))
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-6 w-full max-w-md"> {/* Full width and max width set */}
            <Text className="text-lg font-semibold mb-4">Add Student</Text>

            {/* Scrollable Form */}
            <ScrollView>
              <Controller
                control={control}
                name="firstname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="First Name"
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Date of Birth (YYYY-MM-DD)"
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="parentAddress"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Parent Address"
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="parentGender"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Parent Gender"
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="parentNationalId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Parent National ID"
                    className="border p-2 rounded mb-2"
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
                    className="border p-2 rounded mb-2"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </ScrollView>

            <View className="flex-row justify-between mt-4">
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
              <Button title="Add Student" onPress={handleSubmit(onAddStudent)} />
            </View>
          </View>
        </View>
      </Modal>

      <FloatingAction
        actions={[{
          text: "Add Student",
          // icon: require('./path-to-your-icon.png'), // Change the path to your icon
          name: "bt_add",
          position: 2,
        }]}
        onPressItem={() => setModalVisible(true)} // Open modal when floating button is pressed
      />
    </View>
  );
};

export default ClassDetails;
