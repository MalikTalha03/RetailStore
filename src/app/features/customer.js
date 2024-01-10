import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async () => {
        const response = await fetch('http://localhost:3001/customer',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        );
        const data = await response.json();
        return data;
    }
);

export const customersSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: [],
        selectedCustomer: [],
        status: 'idle',
        error: null
    },
    reducers: {
        setSelectedCustomer: (state, action) => {
            const contact  = action.payload;
            const customer = state.customers.filter(customer => customer.contact === contact);
            state.selectedCustomer = customer;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default customersSlice.reducer;
export const { setSelectedCustomer } = customersSlice.actions;