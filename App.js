import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './Screen/HomeScreen';
import CartScreen from './Screen/CartScreen';
import OrderScreen from './Screen/OrderScreen';
import ProfileScreen from './Screen/ProfileScreen';
import Welcome from './Screen/Welcome/welcome';
import Welcome1 from './Screen/Welcome/welcome1';
import Login from './Screen/Login/login';
import Register from './Screen/Login/register';
import Login2 from './Screen/Login/login2';
import RegisterInformation from './Screen/RegisterInformation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import XuLy from './Screen/statusOrder/xuLy';
import DangGiao from './Screen/statusOrder/dangGiao';
import DaGiao from './Screen/statusOrder/daGiao';
import DaHuy from './Screen/statusOrder/daHuy';
import ChatScreen from './Screen/Chat';
import { useIsFocused } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const BotBottomTabNavigator = () => {
  const isFocused = useIsFocused();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubble-ellipses-outline';
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
        options={{ title: 'Home', headerShown: false}}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: 'Chat', headerShown: false }}
      />
      <Tab.Screen
        name="Order"
        component={MyTabs}
        options={{ title: 'Order', headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile', headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name='Welcome1' component={Welcome1} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Login2' component={Login2} options={{ headerShown: false }} />
      <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
      <Stack.Screen name='RegisterInformation' component={RegisterInformation} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}


const HomeNavigator = () =>{
  return(
    <Stack.Navigator>
      {/* <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/> */}
      <Stack.Screen name='Cart' component={CartScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

const Stack = createNativeStackNavigator();


const TabTop = createMaterialTopTabNavigator();

const MyTabs = () => {
  return (
    <TabTop.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarItemStyle: {},
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
        },
      }}
    >
      <TabTop.Screen name="XuLy" component={XuLy} options={{ title: "Xử lý" }} />
      <TabTop.Screen name="DangGiao" component={DangGiao} options={{ title: "Đang giao" }} />
      <TabTop.Screen name="DaGiao" component={DaGiao} options={{ title: "Đã giao" }} />
      <TabTop.Screen name="DaHuy" component={DaHuy} options={{ title: "Đã hủy" }} />
    </TabTop.Navigator>
  );
}


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {/* <Stack.Screen
          name='LoginNavigator'
          options={{ headerShown: false }}
          component={LoginNavigator}
        /> */}
        <Stack.Screen
          name="Main"
          component={BotBottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='HomeNavigator' component={HomeNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
