// ManageTeacherSubjectClass.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Install if not already
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledButton = styled(Button);
const StyledScrollView = styled(ScrollView);

const ManageTeacherSubjectClass = () => {
  const [teacherId, setTeacherId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [classId, setClassId] = useState('');
  const [academicYearId, setAcademicYearId] = useState('');
  const [schemesOfWork, setSchemesOfWork] = useState([
    {
      id: 0,
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      teacherComments: '',
      details: '',
      teacherSubjectClass: '',
    },
  ]);

  const handleSchemeChange = (index, field, value) => {
    const newSchemes = [...schemesOfWork];
    newSchemes[index][field] = value;
    setSchemesOfWork(newSchemes);
  };

  const addScheme = () => {
    setSchemesOfWork([
      ...schemesOfWork,
      {
        id: 0,
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        teacherComments: '',
        details: '',
        teacherSubjectClass: '',
      },
    ]);
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!teacherId || !subjectId || !classId || !academicYearId) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    const payload = {
      teacher: { id: parseInt(teacherId) },
      subject: { id: parseInt(subjectId) },
      schoolClass: { id: parseInt(classId) },
      academicYear: { id: parseInt(academicYearId) },
    //   schemesOfWork: schemesOfWork.map((scheme) => ({
    //     ...scheme,
    //     id: 0, // Assuming new scheme
    //     startDate: new Date(scheme.startDate).toISOString(),
    //     endDate: new Date(scheme.endDate).toISOString(),
    //   })),
    };

    try {
      const response = await axios.post(
        'http://192.168.40.28:8080/api/teacher-subject-class',
        payload
      );
      Alert.alert('Success', 'Teacher-Subject-Class relationship created.');
      // Reset form or navigate as needed
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create relationship.');
    }
  };

  return (
    <StyledScrollView className="flex-1 p-4 bg-white">
      <StyledText className="text-2xl font-bold mb-4">Manage Teacher-Subject-Class</StyledText>

      {/* Teacher ID */}
      <View className="mb-4">
        <StyledText className="mb-1">Teacher ID</StyledText>
        <StyledTextInput
          className="border border-gray-300 p-2 rounded"
          placeholder="Enter Teacher ID"
          keyboardType="numeric"
          value={teacherId}
          onChangeText={setTeacherId}
        />
      </View>

      {/* Subject ID */}
      <View className="mb-4">
        <StyledText className="mb-1">Subject ID</StyledText>
        <StyledTextInput
          className="border border-gray-300 p-2 rounded"
          placeholder="Enter Subject ID"
          keyboardType="numeric"
          value={subjectId}
          onChangeText={setSubjectId}
        />
      </View>

      {/* Class ID */}
      <View className="mb-4">
        <StyledText className="mb-1">Class ID</StyledText>
        <StyledTextInput
          className="border border-gray-300 p-2 rounded"
          placeholder="Enter Class ID"
          keyboardType="numeric"
          value={classId}
          onChangeText={setClassId}
        />
      </View>

      {/* Academic Year ID */}
      <View className="mb-4">
        <StyledText className="mb-1">Academic Year ID</StyledText>
        <StyledTextInput
          className="border border-gray-300 p-2 rounded"
          placeholder="Enter Academic Year ID"
          keyboardType="numeric"
          value={academicYearId}
          onChangeText={setAcademicYearId}
        />
      </View>

      {/* Schemes of Work */}
      <StyledText className="text-xl font-semibold mb-2">Schemes of Work</StyledText>
      {schemesOfWork.map((scheme, index) => (
        <View key={index} className="mb-4 p-4 border border-gray-200 rounded">
          <StyledText className="text-lg font-medium mb-2">Scheme {index + 1}</StyledText>

          <StyledText className="mb-1">Title</StyledText>
          <StyledTextInput
            className="border border-gray-300 p-2 rounded mb-2"
            placeholder="Enter Title"
            value={scheme.title}
            onChangeText={(text) => handleSchemeChange(index, 'title', text)}
          />

          <StyledText className="mb-1">Description</StyledText>
          <StyledTextInput
            className="border border-gray-300 p-2 rounded mb-2"
            placeholder="Enter Description"
            value={scheme.description}
            onChangeText={(text) => handleSchemeChange(index, 'description', text)}
          />

          <StyledText className="mb-1">Start Date</StyledText>
          <StyledTextInput
            className="border border-gray-300 p-2 rounded mb-2"
            placeholder="YYYY-MM-DD"
            value={scheme.startDate}
            onChangeText={(text) => handleSchemeChange(index, 'startDate', text)}
          />

          <StyledText className="mb-1">End Date</StyledText>
          <StyledTextInput
            className="border border-gray-300 p-2 rounded mb-2"
            placeholder="YYYY-MM-DD"
            value={scheme.endDate}
            onChangeText={(text) => handleSchemeChange(index, 'endDate', text)}
          />

          <StyledText className="mb-1">Teacher Comments</StyledText>
          <StyledTextInput
            className="border border-gray-300 p-2 rounded mb-2"
            placeholder="Enter Comments"
            value={scheme.teacherComments}
            onChangeText={(text) => handleSchemeChange(index, 'teacherComments', text)}
          />

          <StyledText className="mb-1">Details</StyledText>
          <StyledTextInput
            className="border border-gray-300 p-2 rounded mb-2"
            placeholder="Enter Details"
            value={scheme.details}
            onChangeText={(text) => handleSchemeChange(index, 'details', text)}
          />

          <StyledText className="mb-1">Teacher Subject Class</StyledText>
          <StyledTextInput
            className="border border-gray-300 p-2 rounded"
            placeholder="Enter Teacher Subject Class"
            value={scheme.teacherSubjectClass}
            onChangeText={(text) => handleSchemeChange(index, 'teacherSubjectClass', text)}
          />
        </View>
      ))}

      <Button title="Add Another Scheme" onPress={addScheme} />

      {/* Submit Button */}
      <View className="mt-6">
        <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
      </View>
    </StyledScrollView>
  );
};

export default ManageTeacherSubjectClass;
