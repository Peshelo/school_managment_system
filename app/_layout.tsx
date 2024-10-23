import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import React from "react";

const InitialLayout = () => {
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
        headerShown:false
      }}
    >
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />

      

      <Stack.Screen name="(teacher)" options={{ title: "Teacher Portal" }} />
      {/* <Stack.Screen name="(parent)" options={{ title:"Parent Portal"}} /> */}

      <Stack.Screen
        name="parent/children/[id]"
        options={{ headerShown: true }}
      />
      <Stack.Screen name="(parent)" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
export default function RootLayout() {
  return (
    <ActionSheetProvider>
      <>
       <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
      </>
     
    </ActionSheetProvider>
  );
}
