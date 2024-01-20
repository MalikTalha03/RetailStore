import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const fetchTodayOrders = createAsyncThunk(
  "orders/fetchTodayOrders",
  async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+"customer/today", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response);

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Create a slice
export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state
    builder.addCase(fetchTodayOrders.pending, (state) => {
      state.status = "loading";
    });

    // Handle the fulfilled state
    builder.addCase(fetchTodayOrders.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.orders = action.payload;
    });

    // Handle the rejected state
    builder.addCase(fetchTodayOrders.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

// Export the reducer
export default ordersSlice.reducer;
