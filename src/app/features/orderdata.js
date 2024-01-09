import {createSlice} from '@reduxjs/toolkit';

export const orderdataSlice = createSlice({
    name: 'orderdata',
    initialState: {
        orderdata: [],
        status: 'idle',
        error: null
    },
    reducers: {
        setOrderdata: (state, action) => {
            state.orderdata = [...state.orderdata, action.payload]
        }
    }
});

export const {setOrderdata} = orderdataSlice.actions;
export default orderdataSlice.reducer;