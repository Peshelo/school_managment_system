import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

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
        name="manage"
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
        name="account"
        options={{
            headerShown: false,
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
<MaterialCommunityIcons name="account" size={24} color={color} />        ),
        }}
      />

    </Tabs>
  );
}
