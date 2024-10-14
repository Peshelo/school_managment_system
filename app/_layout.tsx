import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />

         <Stack.Screen name="admin/school/index" options={{ title:"School Details" }} />
         <Stack.Screen name="admin/teachers/index" options={{ title:"Manage Teachers"}} />
         <Stack.Screen name="admin/subjects/index" options={{ title:"Manage Subjects"}} />

         <Stack.Screen name="admin/classes/index" options={{ title:"Manage Classes"}} />
         <Stack.Screen name="admin/parents/index" options={{ title:"Manage Parents"}} />




         <Stack.Screen name="(teacher)" options={{ title:"Teacher Portal"}} />


         <Stack.Screen name="+not-found" />

    </Stack>
  );
}
