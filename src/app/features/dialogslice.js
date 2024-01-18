import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    dialog1: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    dialog5: false,
    dialog6: false,
    dialog7: false,
  },
  reducers: {
    setDialog1: (state, action) => {
      state.dialog1 = action.payload;
    },
    setDialog2: (state, action) => {
      state.dialog2 = action.payload;
    },
    setDialog3: (state, action) => {
      state.dialog3 = action.payload;
    },
    setDialog4: (state, action) => {
      state.dialog4 = action.payload;
    },
    setDialog5: (state, action) => {
      state.dialog5 = action.payload;
    },
    setDialog6: (state, action) => {
      state.dialog6 = action.payload;
    },
    setDialog7: (state, action) => {
      state.dialog7 = action.payload;
    },
  },
});

export const {
  setDialog1,
  setDialog2,
  setDialog3,
  setDialog4,
  setDialog5,
  setDialog6,
  setDialog7,
} = dialogSlice.actions;
export default dialogSlice.reducer;
