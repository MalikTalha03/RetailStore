import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSuppliers = createAsyncThunk(
    'suppliers/fetchSuppliers',
    async () => {
        const response = await fetch('http://localhost:3001/supplier',
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

export const suppliersSlice = createSlice({
    name: 'suppliers',
    initialState: {
        suppliers: [],
        selectedSupplier: [],
        status: 'idle',
        error: null
    },
    reducers: {
        setSelectedSupplier: (state, action) => {
            const name  = action.payload;
            const supplier = state.suppliers.filter(supplier => supplier.name === name);
            state.selectedSupplier = supplier;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.suppliers = action.payload;
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default suppliersSlice.reducer;
export const { setSelectedSupplier } = suppliersSlice.actions;