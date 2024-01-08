import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState: {
        dialog1: false,
        dialog2: false,
    },
    reducers: {
        setDialog1: (state, action) => {
            state.dialog1 = action.payload;
        },
        setDialog2: (state, action) => {
            state.dialog2 = action.payload;
        }
    }
});

export const { setDialog1, setDialog2 } = dialogSlice.actions;
export default dialogSlice.reducer;