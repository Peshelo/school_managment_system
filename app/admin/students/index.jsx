import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, Modal, StyleSheet } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Stack, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import apiClient from '../../../utils/apiClient'; // Create an API client
import { Select, SelectItem } from '@ui-kitten/components';

const AddStudentModal = ({ visible, onClose, currentStudent, setCurrentStudent, refresh, classes, subjects, selectedClass, setSelectedClass, selectedSubjects, setSelectedSubjects }) => {
    const [newStudent, setNewStudent] = useState({
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      address: '',
      mobileNumber: '',
      nationalId: '',
      dateOfBirth: '',
      enrollmentDate: '',
      parent: {
        id: 6, // Adjust as necessary to get the parent ID dynamically
      },
      assignedClass: {
        id: null, // This will be set by the select
      },
      status: "ACTIVE",
      subjects: [],
    });
  
    // State for date picker
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const handleEditStudent = async () => {
      const token = await SecureStore.getItemAsync('token');
      try {
        await apiClient.put(`/admin/students/${currentStudent.id}`, {
          ...currentStudent,
          assignedClass: { id: selectedClass },
          subjects: selectedSubjects.map(id => ({ id })),
        }, token);
        Alert.alert('Success', 'Student updated successfully!');
        refresh();
        onClose();
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to update student.');
      }
    };
  
    const handleCreateStudent = async () => {
      const token = await SecureStore.getItemAsync('token');
      try {
        await apiClient.post('students', {
          ...newStudent,
          assignedClass: { id: selectedClass },
          subjects: selectedSubjects.map(id => ({ id })),
        }, token);
        Alert.alert('Success', 'Student created successfully!');
        refresh();
        onClose();
        resetForm();
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to create student.');
      }
    };
  
    const resetForm = () => {
      setNewStudent({
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        address: '',
        mobileNumber: '',
        nationalId: '',
        dateOfBirth: '',
        enrollmentDate: '',
        parent: { id: 6 }, // Adjust if necessary
        assignedClass: { id: null },
        status: "ACTIVE",
        subjects: [],
      });
      setSelectedClass(null);
      setSelectedSubjects([]);
    };
  
    const onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || new Date();
      setShowDatePicker(false);
      if (currentStudent) {
        setCurrentStudent({ ...currentStudent, dateOfBirth: currentDate.toISOString().split('T')[0] });
      } else {
        setNewStudent({ ...newStudent, dateOfBirth: currentDate.toISOString().split('T')[0] });
      }
    };
  
    return (
      <Modal visible={visible} animationType="slide" presentationStyle='pageSheet'>
        <View className="flex flex-row justify-between p-4 items-center">
          <Text className="text-xl font-bold text-center">
            {currentStudent ? 'Edit Student' : 'Create Student'}
          </Text>
          <TouchableOpacity className="text-center" onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="p-4">
          <TextInput
            className="border border-gray-300 p-2 mb-2 rounded-md"
            placeholder="First Name"
            value={currentStudent ? currentStudent.firstname : newStudent.firstname}
            onChangeText={(text) => currentStudent ? setCurrentStudent({ ...currentStudent, firstname: text }) : setNewStudent({ ...newStudent, firstname: text })}
          />
          <TextInput
            className="border border-gray-300 p-2 mb-2 rounded-md"
            placeholder="Middle Name"
            value={currentStudent ? currentStudent.middlename : newStudent.middlename}
            onChangeText={(text) => currentStudent ? setCurrentStudent({ ...currentStudent, middlename: text }) : setNewStudent({ ...newStudent, middlename: text })}
          />
          <TextInput
            className="border border-gray-300 p-2 mb-2 rounded-md"
            placeholder="Last Name"
            value={currentStudent ? currentStudent.lastname : newStudent.lastname}
            onChangeText={(text) => currentStudent ? setCurrentStudent({ ...currentStudent, lastname: text }) : setNewStudent({ ...newStudent, lastname: text })}
          />
          <TextInput
            className="border border-gray-300 p-2 mb-2 rounded-md"
            placeholder="Email"
            value={currentStudent ? currentStudent.email : newStudent.email}
            onChangeText={(text) => currentStudent ? setCurrentStudent({ ...currentStudent, email: text }) : setNewStudent({ ...newStudent, email: text })}
          />
          <TextInput
            className="border border-gray-300 p-2 mb-2 rounded-md"
            placeholder="Address"
            value={currentStudent ? currentStudent.address : newStudent.address}
            onChangeText={(text) => currentStudent ? setCurrentStudent({ ...currentStudent, address: text }) : setNewStudent({ ...newStudent, address: text })}
          />
          <TextInput
            className="border border-gray-300 p-2 mb-2 rounded-md"
            placeholder="Mobile Number"
            value={currentStudent ? currentStudent.mobileNumber : newStudent.mobileNumber}
            onChangeText={(text) => currentStudent ? setCurrentStudent({ ...currentStudent, mobileNumber: text }) : setNewStudent({ ...newStudent, mobileNumber: text })}
          />
          <TextInput
            className="border border-gray-300 p-2 mb-2 rounded-md"
            placeholder="National ID"
            value={currentStudent ? currentStudent.nationalId : newStudent.nationalId}
            onChangeText={(text) => currentStudent ? setCurrentStudent({ ...currentStudent, nationalId: text }) : setNewStudent({ ...newStudent, nationalId: text })}
          />
  
          {/* Class Selection */}
          {/* <Select
            selectedIndex={selectedClass}
            onSelect={(index) => setSelectedClass(index.row)}
            className="mb-4"
            placeholder="Select Class"
          >
            {classes.map((classItem, index) => (
              <SelectItem key={index} title={classItem.name} />
            ))}
          </Select> */}
  
          {/* Subject Selection */}
          {/* <MultiSelect
            selectedOptions={selectedSubjects}
            onChange={(selectedItems) => setSelectedSubjects(selectedItems.map(item => item.id))}
            className="mb-4"
            placeholder="Select Subjects"
          >
            {subjects.map((subject, index) => (
              <SelectItem key={index} title={subject.name} />
            ))}
          </MultiSelect> */}
  
          <TouchableOpacity onPress={() => setShowDatePicker(true)} className="border border-gray-300 p-2 mb-2 rounded-md">
            <Text>{currentStudent ? currentStudent.dateOfBirth : newStudent.dateOfBirth || 'Select Date of Birth'}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(currentStudent ? currentStudent.dateOfBirth : newStudent.dateOfBirth || new Date())}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <TouchableOpacity 
            onPress={currentStudent ? handleEditStudent : handleCreateStudent} 
            className="bg-blue-500 p-2 rounded-md mt-4"
          >
            <Text className="text-white text-center">
              {currentStudent ? 'Update Student' : 'Add Student'}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const router = useRouter();

  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = (student) => {
    setCurrentStudent(student);
    const options = ['View', 'Edit', 'Delete', 'Cancel'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;

    showActionSheetWithOptions({
      options,
      title: 'Student Actions',
      separatorStyle: {
        color: 'gray',
      },
      useModal: true,
      message: 'Select an action to perform on the student',
      showSeparators: true,
      destructiveButtonIndex,
      cancelButtonIndex,
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        // Navigate to Student Profile (Replace with actual profile route)
        router.push(`/admin/students/${student.id}`);
      }
      if (buttonIndex === 1) {
        setModalVisible(true);
      }
      if (buttonIndex === 2) {
        handleDeleteStudent(student.id);
      }
    });
  };

  const fetchStudents = async () => {
    const token = await SecureStore.getItemAsync('token');
    try {
      const response = await apiClient.get('students');
      setStudents(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchClasses = async () => {
    const token = await SecureStore.getItemAsync('token');
    try {
      const response = await apiClient.get('classes', token);
      setClasses(response); // Assuming the endpoint returns an array of classes
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubjects = async () => {
    const token = await SecureStore.getItemAsync('token');
    try {
      const response = await apiClient.get('subjects', token);
      setSubjects(response); // Assuming the endpoint returns an array of subjects
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchSubjects();
  }, []);

  const handleDeleteStudent = async (studentId) => {
    const token = await SecureStore.getItemAsync('token');
    try {
      await apiClient.delete(`admin/students/${studentId}`, token);
      Alert.alert('Success', 'Student deleted successfully!');
      fetchStudents();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete student.');
    }
  };

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log("Open Student Profile")} className="border-b border-gray-300 mx-1 rounded-md p-4 flex-row items-center">
      <View className="flex-1">
        <Text className="font-bold">{item.firstname} {item.lastname}</Text>
        <Text>{item.email}</Text>
      </View>
      <TouchableOpacity onPress={() => openActionSheet(item)} className="flex-row">
        <MaterialCommunityIcons name="dots-vertical" size={24} color="gray" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Manage Students",
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => setModalVisible(true)} className="p-2 rounded-md">
              <MaterialCommunityIcons name="account-plus" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudentItem}
        contentContainerStyle={{ paddingBottom: 80 }} // Add padding for fixed button space
        showsVerticalScrollIndicator={false} // Hides the scroll indicator
      />

      {/* Modal for Adding/Editing Student */}
      <AddStudentModal 
        visible={modalVisible} 
        onClose={() => { setCurrentStudent(null); setModalVisible(false); }} 
        currentStudent={currentStudent} 
        setCurrentStudent={setCurrentStudent} 
        refresh={fetchStudents} 
        classes={classes}
        subjects={subjects}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedSubjects={selectedSubjects}
        setSelectedSubjects={setSelectedSubjects}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  // Add your custom styles here if needed
});

export default StudentManagement;
