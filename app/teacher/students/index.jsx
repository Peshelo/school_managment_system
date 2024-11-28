import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, Modal, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Stack, useRouter } from 'expo-router';
import apiClient from '../../../utils/apiClient'; // Create an API client

const SendNoteModal = ({ visible, onClose, student, refresh }) => {
  const [note, setNote] = useState('');

  const handleSendNote = async () => {
    try {
      // Replace with appropriate API endpoint to send the note
      await apiClient.post(`teachers/notes`, {
        studentId: student.id,
        message: note,
      });
      Alert.alert('Success', 'Note sent successfully!');
      setNote('');
      onClose();
      refresh();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send note.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="p-4">
        <Text className="text-xl font-bold">Send Note to {student?.firstname} {student?.lastname}</Text>
        <TextInput
          className="border border-gray-300 p-2 mt-4 rounded-md"
          placeholder="Enter your note here..."
          value={note}
          onChangeText={setNote}
          multiline
        />
        <TouchableOpacity onPress={handleSendNote} className="bg-blue-500 p-2 mt-4 rounded-md">
          <Text className="text-white text-center">Send Note</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} className="mt-4">
          <Text className="text-center text-blue-500">Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const TeacherStudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const router = useRouter();
  const { showActionSheetWithOptions } = useActionSheet();

  const fetchStudents = async () => {
    try {
      const response = await apiClient.get('students'); // Adjust endpoint as needed
      setStudents(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const openActionSheet = (student) => {
    setSelectedStudent(student);
    const options = ['View Profile', 'View Marks', 'Send Note', 'Cancel'];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        title: `${student.firstname} ${student.lastname}`,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          router.push(`/teacher/students/${student.id}`); // View Profile Route
        }
        if (buttonIndex === 1) {
          router.push(`/teacher/students/${student.id}/marks`); // View Marks Route
        }
        if (buttonIndex === 2) {
          setNoteModalVisible(true);
        }
      }
    );
  };

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => openActionSheet(item)}
      className="border-b border-gray-300 mx-1 rounded-md p-4 flex-row items-center"
    >
      <View className="flex-1">
        <Text className="font-bold">{item?.firstname} {item?.lastname}</Text>
        <Text>{item?.email}</Text>
      </View>
      <MaterialCommunityIcons name="dots-vertical" size={24} color="gray" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Students",
          headerBackVisible: true,
        }}
      />
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudentItem}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal for Sending Note */}
      {selectedStudent && (
        <SendNoteModal
          visible={noteModalVisible}
          onClose={() => setNoteModalVisible(false)}
          student={selectedStudent}
          refresh={fetchStudents}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your custom styles here if needed
});

export default TeacherStudentManagement;
