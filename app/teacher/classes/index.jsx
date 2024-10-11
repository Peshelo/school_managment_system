import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';
import { getAllInformation } from '../../teacher-services/Class-service'; // Assuming similar service file


const Classes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [classStudentMap, setClassStudentMap] = useState({});
  const [teacherClassSubjectMap, setTeacherClassSubjectMap] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    getAllInfo();
  }, []);

  const getAllInfo = async () => {
    setIsLoading(true);
    setInfo([]);
    setClassStudentMap({});
    setTeacherClassSubjectMap({});

    try {
      const apiResponse = await getAllInformation();

      if (apiResponse.data && apiResponse.data.length > 0) {
        const teacherMap = {};
        const classMap = {};

        apiResponse.data.forEach(entry => {
          const teacherName = `${entry.teacher.firstname} ${entry.teacher.lastname}`;
          const className = entry.schoolClass.name;
          const subjectName = entry.subject.name;
          const students = entry.schoolClass.students || [];

          if (!teacherMap[teacherName]) {
            teacherMap[teacherName] = {};
          }

          if (!teacherMap[teacherName][className]) {
            teacherMap[teacherName][className] = [];
          }

          if (!teacherMap[teacherName][className].includes(subjectName)) {
            teacherMap[teacherName][className].push(subjectName);
          }

          if (!classMap[className]) {
            classMap[className] = [];
          }

          students.forEach(student => {
            const studentName = `${student.firstname} ${student.lastname}`;
            if (!classMap[className].includes(studentName)) {
              classMap[className].push(studentName);
            }
          });
        });

        setTeacherClassSubjectMap(teacherMap);
        setClassStudentMap(classMap);
      }
    } catch (e) {
      console.error('Error fetching information: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalOpen = className => {
    setSelectedClass(className);
    setModalVisible(true);
  };

  const renderModalContent = () => {
    const students = classStudentMap[selectedClass] || [];

    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Students in {selectedClass}</Text>
          <Text>Count: {students.length}</Text>
          <ScrollView style={{ marginTop: 16 }}>
            {students.length > 0 ? (
              students.map((student, index) => (
                <View key={index} style={{ padding: 8, marginVertical: 4 }}>
                  <Text>{student}</Text>
                </View>
              ))
            ) : (
              <Text>No students found for this class.</Text>
            )}
          </ScrollView>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    );
  };

  const teacherName = 'Ruramai Botso'; // Example teacher name

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : teacherClassSubjectMap[teacherName] ? (
        <FlatList
          data={Object.keys(teacherClassSubjectMap[teacherName])}
          keyExtractor={(item) => item}
          renderItem={({ item: className }) => (
            <View style={{ padding: 16, marginVertical: 8, backgroundColor: '#f0f8ff', borderRadius: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Class: {className}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No classes found</Text>
      )}
      {renderModalContent()}
    </View>
  );
};

export default Classes;
