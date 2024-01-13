import {createSlice} from '@reduxjs/toolkit';
import ordersService from '../services/orders.service';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    entities: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    ordersRequested: (state) => {
      state.isLoading = true;
    },
    ordersReceived: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    ordersRequestFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addOrderRequested: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addOrderReceiveFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addOrderReceived: (state, action) => {
      state.isLoading = false;
      state.entities = [...state.entities, action.payload];
    },
  },
});

export const uploadOrdersList = () => async (dispatch) => {
  dispatch(ordersRequested());
  try {
    const data = await ordersService.get();
    dispatch(ordersReceived(data));
  } catch (error) {
    dispatch(ordersRequestFailed(error));
  }
};
export const addOrder = (order) => async (dispatch) => {
  dispatch(addOrderRequested());
  try {
    const data = await ordersService.add(order);
    dispatch(addOrderReceived(data));
  } catch (error) {
    dispatch(addOrderReceiveFailed(error));
  }
};

export const getOrders = () => (state) => state.orders.entities;
export const getOrdersLoadingStatus = () => (state) => state.orders.isLoading;
export const {
  ordersRequested,
  ordersReceived,
  ordersRequestFailed,
  addOrderRequested,
  addOrderReceived,
  addOrderReceiveFailed,
} = ordersSlice.actions;

export default ordersSlice.reducer;