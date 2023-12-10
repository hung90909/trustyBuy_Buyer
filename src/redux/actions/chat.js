import {CHAT_API} from '../../config/urls';
import {apiGet, apiPost} from '../../utils/utils';
import {saveChat} from '../reducers/chat';
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
