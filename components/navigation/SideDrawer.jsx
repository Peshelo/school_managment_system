// App.js or in a separate navigation file
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Index from './Index'; // Update the path as needed
import OtherScreen from './OtherScreen'; // Another screen for illustration

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Index} />
        <Drawer.Screen name="Other" component={OtherScreen} />
        {/* Add more screens here */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
