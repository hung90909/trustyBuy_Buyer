import {createSlice} from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressData: null,
  },
  reducers: {
    saveAddress: (state, action) => {
      state.addressData = action.payload;
    },
  },
});

export const {saveAddress} = addressSlice.actions;
export default addressSlice.reducer;
