import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import apiClient from '@/utils/apiClient.js';

const ManageSchool = () => {
  const [schoolData, setSchoolData] = useState({
    name: '',
    address: '',
    email: '',
    mobileNumber: '',
    landlineNumber: '',
  });
  const [loading, setLoading] = useState(true);

  const fetchSchoolData = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const response = await apiClient.getAuthorized('admin/school', token); // Update with the actual school ID if needed
      setSchoolData(response);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch school data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, []);

  const handleInputChange = (name, value) => {
    setSchoolData({ ...schoolData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true); // Show loader on submit
    try {
      await apiClient.putAuthorized('admin/school/1', schoolData); // Change the ID if needed
      Alert.alert('Success', 'School details updated successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update school details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading school data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchSchoolData} />
        }
      >
        <View style={styles.formContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
          </View>

          <Text style={styles.headerText}>Manage School</Text>

          {/* School Name */}
          <Text style={styles.label}>School Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter School Name"
            value={schoolData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />

          {/* Address */}
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Address"
            value={schoolData.address}
            onChangeText={(text) => handleInputChange('address', text)}
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={schoolData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
          />

          {/* Mobile Number */}
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            value={schoolData.mobileNumber}
            onChangeText={(text) => handleInputChange('mobileNumber', text)}
            keyboardType="phone-pad"
          />

          {/* Landline Number */}
          <Text style={styles.label}>Landline Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Landline Number"
            value={schoolData.landlineNumber}
            onChangeText={(text) => handleInputChange('landlineNumber', text)}
            keyboardType="phone-pad"
          />

          {/* Submit Button */}
          <TouchableOpacity className="bg-slate-900 p-4 px-4 rounded-lg text-white" style={styles.button} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Update School</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add your TopNavBar here if necessary */}
      {/* <TopNavBar /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75, // Optional: round the logo
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#002144FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default ManageSchool;
