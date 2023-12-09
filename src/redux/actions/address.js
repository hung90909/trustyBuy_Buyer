import {USER_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {saveAddress} from '../reducers/address';
import store from '../store';

export const saveAddressData = async () => {
  try {
    const res = await apiGet(`${USER_API}/getProfile`);
    const address = res?.message?.checkUser?.information?.address[0];

    if (address) {
      store.dispatch(saveAddress(address));
    }
  } catch (error) {
    throw error;
  }
};

export const changeAddress = async newAddress => {
  try {
    store.dispatch(saveAddress(newAddress));
    console.log(newAddress);
    console.log('==============================');
    return true; // Assuming success, you might want to handle this differently
  } catch (error) {
    throw error;
  }
};
