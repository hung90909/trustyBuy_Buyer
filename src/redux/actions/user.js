import {USER_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {saveUser} from '../reducers/user';
import store from '../store';

export const saveUserData = async () => {
  try {
    const res = await apiGet(`${USER_API}/getProfile`);
    store.dispatch(saveUser(res?.message?.checkUser?.information));
  } catch (error) {
    throw error;
  }
};
