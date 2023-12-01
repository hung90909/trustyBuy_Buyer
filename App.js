import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from './Screen/HomeScreen';
import Welcome from './Screen/Welcome/welcome';
import ProfileScreen from './Screen/Profile/ProfileScreen';
import {Ionicons} from 'react-native-vector-icons';
import NotificationScreen from './Screen/NotificationScreen';
import Welcome1 from './Screen/Welcome/welcome1';
import Login from './Screen/Login/login';
import RegisterInformation from './Screen/RegisterInformation';
import XuLy from './Screen/statusOrder/xuLy';
import DangGiao from './Screen/statusOrder/dangGiao';
import DaGiao from './Screen/statusOrder/daGiao';
import DaHuy from './Screen/statusOrder/daHuy';
import ChatScreen from './Screen/Chat';
import DetailProducts from './Screen/detailProduct';
import login2 from './Screen/Login/login2';
import register from './Screen/Login/register';
import SearchScreen from './Screen/SearchScreen';
import ListProduct from './Screen/ListProduct';
import ShopInformation from './Screen/ShopInformation';
import AdressScreen from './Screen/Address/AddressScreen';
import EditProfile from './Screen/EditProfile';
import CartScreen from './Screen/CartScreen';

const TabTop = createMaterialTopTabNavigator();

const TabOrder = () => (
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
    }}>
    <TabTop.Screen name="XuLy" component={XuLy} options={{title: 'Xử lý'}} />
    <TabTop.Screen
      name="DangGiao"
      component={DangGiao}
      options={{title: 'Đang giao'}}
    />
    <TabTop.Screen
      name="DaGiao"
      component={DaGiao}
      options={{title: 'Đã giao'}}
    />
    <TabTop.Screen name="DaHuy" component={DaHuy} options={{title: 'Đã hủy'}} />
  </TabTop.Navigator>
);

const Tab = createBottomTabNavigator();

const BotBottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({color, size}) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Chat') {
          iconName = 'chatbubble-ellipses-outline';
        } else if (route.name === 'TabOrder') {
          iconName = 'document-text-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
    <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Home'}} />
    <Tab.Screen name="Chat" component={ChatScreen} options={{title: 'Chat'}} />
    <Tab.Screen
      name="TabOrder"
      component={TabOrder}
      options={{title: 'Order'}}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{title: 'Profile'}}
    />
  </Tab.Navigator>
);

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Welcome1" component={Welcome1} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={register} />
      <Stack.Screen name="Login2" component={login2} />
      <Stack.Screen name="Main" component={BotBottomTabNavigator} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen
        name="RegisterInformation"
        component={RegisterInformation}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ListProduct" component={ListProduct} />
      <Stack.Screen name="ShopInformation" component={ShopInformation} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="DetailProducts" component={DetailProducts} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AdressScreen" component={AdressScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
