import {PermissionsAndroid} from 'react-native';
import {getItem, setItem} from '../../utils/utils';
import {saveUserData} from './user';
import {saveChatData, saveNotiData} from './chat';
import socketServices from '../../utils/socketService';
import {Notifications} from 'react-native-notifications';

const handlePress = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Notifications.postLocalNotification({
        title: 'Thông báo',
        body: 'Bạn có một tin nhắn mới',
        extra: 'data',
      });
    } else {
      throw new Error('Permission not granted');
    }
  } catch (error) {
    throw error;
  }
};

export const fetchData = async () => {
  try {
    const token = await getItem('token');
    const currentCount = (await getItem('notifi')) || 0;

    saveUserData();
    await saveChatData();
    saveNotiData(currentCount);

    socketServices.emit('new-user-add', token?.userId);

    socketServices.on(`newChat-${token?.userId}`, async () => {
      handlePress();
      await saveChatData();
    });

    socketServices.on(`notification-${token?.userId}`, async () => {
      try {
        const currentCount = (await getItem('notifi')) || 0;
        const newCount = Number(currentCount) + 1;

        await setItem('notifi', newCount.toString());

        saveNotiData(newCount);
      } catch (error) {
        throw error;
      }
    });
  } catch (error) {
    throw error;
  }
};
