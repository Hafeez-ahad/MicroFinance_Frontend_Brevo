import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
   
    saveData: (state,payload) => {
      state.value.push(payload)
    },
  },
});

export const {  saveData } = counterSlice.actions;
export default counterSlice.reducer;
