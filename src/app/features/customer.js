import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await fetch("http://localhost:3001/customer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  }
);

export const fetchCustOrders = createAsyncThunk(
  "customers/fetchCustOrders",
  async () => {
    const response = await fetch("http://localhost:3001/customer/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  }
);

export const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    selectedCustomer: {},
    custOrders: [],
    status: "idle",
    error: null,
    inselected: "no",
  },
  reducers: {
    setSelectedCustomer: (state, action) => {
      const contact = action.payload;
      const customer = state.customers.find((cust) => cust.contact === contact);
      if (!customer) {
        return {
          ...state,
          selectedCustomer: { firstname: "", lastname: "", contact: contact },
          inselected: "false",
        };
      } else {
        return {
          ...state,
          selectedCustomer: customer,
          inselected: "true",
        };
      }
    },

    updateSelectedCustomer: (state, action) => {
      const { name, value } = action.payload;
      if (name === "name") {
        const firstname = value.split(" ")[0];
        const lastname = value.split(" ")[1];
        state.selectedCustomer = {
          ...state.selectedCustomer,
          firstname: firstname || "",
          lastname: lastname || "",
          inselected: "false",
        };
      }
      state.selectedCustomer = {
        ...state.selectedCustomer,
        [name]: value,
        inselected: "false",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchCustOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.custOrders = action.payload.map((customer) => ({
          ...customer,
          orders: customer.orders.map((order) => ({
            ...order,
            totalAmount: calculateTotalAmount(order.orderDetails),
          })),
        }));
      })
      .addCase(fetchCustOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const calculateTotalAmount = (orderDetails) => {
    return orderDetails.reduce((total, orderDetail) => {
      return total + orderDetail.qty * orderDetail.unitPrice;
    }, 0);
  };

export default customersSlice.reducer;
export const { setSelectedCustomer, updateSelectedCustomer } =
  customersSlice.actions;
