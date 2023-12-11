import {CHAT_API} from '../../config/urls';
import {apiGet, apiPost} from '../../utils/utils';
import {saveChat, saveNoti} from '../reducers/chat';
import store from '../store';

export const saveChatData = async () => {
  try {
    const res = await apiGet(`${CHAT_API}/getConvarsations`);
    store.dispatch(saveChat(res?.message));
    return true;
  } catch (error) {
    throw error;
  }
};

export const changeChat = async shopId => {
  try {
    await apiPost(`${CHAT_API}/createConvarsation`, {
      shopId: shopId,
    });
    return await saveChatData();
  } catch (error) {
    throw error;
  }
};

export const saveNotiData = async count => {
  try {
    store.dispatch(saveNoti(count));
  } catch (error) {
    throw error;
  }
};

export const chatApi = async (shopId, chatData, navigation) => {
  await changeChat(shopId);
  const itemData = chatData.find(item => item.chat.shopId === shopId);

  if (itemData) {
    navigation.navigate('ChatItem', {
      data: {
        idRoom: itemData?.chat?._id,
        idShop: itemData?.chat?.userId,
        useName: itemData?.user?.user_name,
        avatar: itemData?.user?.user_avatar,
      },
    });
  } else {
    navigation.navigate('ChatScreen');
  }
};
