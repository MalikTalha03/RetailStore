import { createSlice } from "@reduxjs/toolkit";

export const orderdataSlice = createSlice({
  name: "orderdata",
  initialState: {
    orderdata: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setOrderdata: (state, action) => {
      state.orderdata = [...state.orderdata, action.payload];
    },
    updateOrderdata: (state, action) => {
      const updatedData = state.orderdata.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload, total: action.payload.price * action.payload.quantity }
          : item
      );
      state.orderdata = updatedData;
    },
  },
});

export const { setOrderdata,updateOrderdata } = orderdataSlice.actions;
export default orderdataSlice.reducer;
