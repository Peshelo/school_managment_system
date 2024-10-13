import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const statsData = [
  { id: '1', value: '2680', description: 'Total Teachers', icon: 'people' },
  { id: '2', value: '1540', description: 'Active Students', icon: 'school' },
  { id: '3', value: '890', description: 'Enrolled Courses', icon: 'book' },
  { id: '4', value: '425', description: 'Completed Exams', icon: 'checkmark-circle' }
];

const StatsCard = () => {
  const renderCard = ({ item }) => (
    <View
      style={{
        width: width * 0.4,  // 70% of screen width for each card
        marginHorizontal: 4,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
      }}
      className="flex-1 flex flex-col justify-center items-center bg-white rounded-lg p-4 mb-4 border border-gray-300"
      >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={item.icon} size={40} color="#1e3a8a" style={{ marginRight: 10 }} />
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
        {item.value} +
      </Text>
      <Text style={{ fontSize: 12, color: 'gray', textAlign: 'center', marginTop: 10 }}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={statsData}
      renderItem={renderCard}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={width * 0.7 + 20} // Card width + margin for snapping
      decelerationRate="fast"
      pagingEnabled
    />
  );
};

export default StatsCard;
