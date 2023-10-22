import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Screen/HomeScreen';
import CartScreen from './Screen/CartScreen';
import OrderScreen from './Screen/OrderScreen';
import ProfileScreen from './Screen/ProfileScreen';
import Welcome from './Screen/Welcome/welcome';
import Welcome1 from './Screen/Welcome/welcome1';
import Login from './Screen/Login/login';
import register from './Screen/Login/register';
import login2 from './Screen/Login/login2';
import RegisterInformation from './Screen/RegisterInformation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BotBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = 'cart-outline';
          } else if (route.name === 'Order') {
            iconName = 'document-text-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home', headerShown: false}}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{title: 'Cart', headerShown: false}}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{title: 'Order', headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Profile', headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Welcome1"
          component={Welcome1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login2"
          component={login2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterInformation"
          component={RegisterInformation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BotBottomTabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
