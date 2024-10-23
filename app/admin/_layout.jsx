import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const Layout = () => {
    return (
        <Stack    
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown:true}}
          >
            <Stack.Screen
        name="school/index"
        options={{ title: "School Details" }}
      />
  
      <Stack.Screen
        name="subjects/index"
        options={{ title: "Manage Subjects" }}
      />

      <Stack.Screen
        name="classes/index"
        options={{ title: "Manage Classes" }}
      />
      <Stack.Screen
        name="parents/index"
        options={{ title: "Manage Parents" }}
      />
        </Stack>
    );
}

const styles = StyleSheet.create({})

export default Layout;
