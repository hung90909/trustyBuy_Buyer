import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Provider, useSelector} from 'react-redux';
import HomeScreen from './src/Screen/home/HomeScreen';
import Welcome from './src/Screen/Welcome/welcome';
import ProfileScreen from './src/Screen/Profile/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationScreen from './src/Screen/Notification/NotificationScreen';
import Welcome1 from './src/Screen/Welcome/welcome1';
import Login from './src/Screen/Login/login';
import RegisterInformation from './src/Screen/RegisterInformation';
import XuLy from './src/Screen/Order/xuLy';
import DangGiao from './src/Screen/Order/dangGiao';
import DaGiao from './src/Screen/Order/daGiao';
import DaHuy from './src/Screen/Order/daHuy';
import ChatScreen from './src/Screen/Chat/ChatScreen';
import DetailProducts from './src/Screen/home/detailProduct';
import login2 from './src/Screen/Login/login2';
import register from './src/Screen/Login/register';
import SearchScreen from './src/Screen/SearchScreen';
import ListProduct from './src/Screen/ListProduct';
import ShopInformation from './src/Screen/InfoShop/ShopInformation';
import AdressScreen from './src/Screen/Address/AddressScreen';
import EditProfile from './src/Screen/Profile/EditProfile';
import CartScreen from './src/Screen/Cart/CartScreen';
import ChangePassword from './src/Screen/ChangePassword';
import CheckoutScreen from './src/Screen/CheckoutScreen';
import ChatItem from './src/Screen/Chat/ChatItem';
import socketServices from './src/utils/socketService';
import store from './src/redux/store';
import ListProductInCategory from './src/Screen/home/ListProductInCategory';
import Checkouts from './src/Screen/Cart/Checkouts';
import ListAddress from './src/Screen/Cart/ListAddress';
import ListDiscount from './src/Screen/Cart/ListDiscount';
import OtpScreen from './src/Screen/Login/OtpScreen';
import OptionAddress from './src/Screen/OptionAddress';
import listDiscount from './src/Screen/Discount/listDiscount';
import success from './src/Screen/success';
import detailXuLy from './src/Screen/Order/detailOrder';
import detailOrder from './src/Screen/Order/detailOrder';

const TabTop = createMaterialTopTabNavigator();

const TabOrder = () => (
  <TabTop.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: {
        fontSize: 13,
        // fontWeight: 'bold',
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

const BotBottomTabNavigator = () => {
  const data = useSelector(state => state?.chat?.chatData);
  const notificationCount = data
    ? data.reduce((count, item) => count + item.chat?.isRead?.user?.countNew, 0)
    : 0;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'ChatScreen') {
            iconName = 'chatbubble-ellipses-outline';
          } else if (route.name === 'TabOrder') {
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
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarBadge: notificationCount > 0 ? notificationCount : null,
          title: 'Chat',
        }}
      />
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
};

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    socketServices.initializeSocket();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Welcome1" component={Welcome1} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Login2" component={login2} />
          <Stack.Screen name="Register" component={register} />
          <Stack.Screen
            name="RegisterInformation"
            component={RegisterInformation}
          />
          <Stack.Screen name="Main" component={BotBottomTabNavigator} />
          <Stack.Screen name="ChatItem" component={ChatItem} />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="ListProduct" component={ListProduct} />
          <Stack.Screen name="ShopInformation" component={ShopInformation} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="DetailProducts" component={DetailProducts} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="AdressScreen" component={AdressScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="ListAddress" component={ListAddress} />
          <Stack.Screen name="ListDiscount" component={ListDiscount} />
          <Stack.Screen
            name="ListProductInCategory"
            component={ListProductInCategory}
          />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen name="OptionAddress" component={OptionAddress} />
          <Stack.Screen name="Checkouts" component={Checkouts} />
          <Stack.Screen name="listDiscount" component={listDiscount} />
          <Stack.Screen name="success" component={success} />
          <Stack.Screen name="DetailOrder" component={detailOrder} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
