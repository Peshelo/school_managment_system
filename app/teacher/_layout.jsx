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
        name="teacher/classes"
        options={{ title: "School Classes" }}
      />
  
      <Stack.Screen
        name="teacher/schemes"
        options={{ title: "Manage Schemes of work" }}
      />

      <Stack.Screen
        name=".teacher/students"
        options={{ title: "Manage Subjects" }}
      />
        </Stack>
    );
}

const styles = StyleSheet.create({})

export default Layout;
