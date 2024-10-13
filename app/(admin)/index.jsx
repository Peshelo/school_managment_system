import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

// StatsCard Component (You can further refactor this into a separate file if needed)
const StatsCard = ({ title, value, icon, color }) => {
  return (
    <View style={[styles.statsCard, { backgroundColor: color }]}>
      <Icon name={icon} size={30} color="white" />
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsTitle}>{title}</Text>
    </View>
  );
};

const Index = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Dashboard",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: true,
          headerRight: () => {
            // My account button with icon
            return (
              <TouchableOpacity
                onPress={() => router.push('/account')}
                style={styles.headerButton}
              >
                <Icon name="user" size={20} color="white" />
              </TouchableOpacity>
            );
          },
        }}
      />

      {/* Search Section */}
      <View style={styles.searchSection} className="border border-gray-400">
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          className=""
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* General Statistics */}
      <Text style={styles.sectionTitle}>General Statistics</Text>
      <Text style={styles.sectionSubtitle}>View general statistics of the school</Text>

      {/* Statistics Cards */}
      <View style={styles.statsContainer}>
        <StatsCard
          title="Total Students"
          value="1200"
          icon="graduation-cap"
          color={Colors.primary}
        />
        <StatsCard
          title="Total Teachers"
          value="85"
          icon="users"
          color={Colors.primary}
        />
        <StatsCard
          title="Total Classes"
          value="50"
          icon="folder"
          color={Colors.primary}
        />
        <StatsCard
          title="Total Parents"
          value="750"
          icon="user"
          color={Colors.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 16,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    marginRight: 10,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statsCard: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  statsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  statsTitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
});

export default Index;
