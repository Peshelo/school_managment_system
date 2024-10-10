import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          // tabBarBadge: 3,
        }}
      />
       <Tabs.Screen
        name="account"
        options={{
            headerShown: false,
          title: 'Manage',
          tabBarIcon: ({ color, focused }) => (
<MaterialIcons name="folder-copy" size={24} color={color} />                  ),
        }}
      />
          <Tabs.Screen
        name="notifications"
        options={{
            headerShown: false,
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
<Ionicons name="notifications" size={24} color={color} />

            ),
            tabBarBadge:3

        }}
      />
       <Tabs.Screen
        name="settings"
        options={{
            headerShown: false,
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
<MaterialIcons name="settings" size={24} color={color} />          ),
        }}
      />
       {/* <Tabs.Screen
        name="ManageSchool"
        options={{
            headerShown: false,
          title: 'Manage School',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
