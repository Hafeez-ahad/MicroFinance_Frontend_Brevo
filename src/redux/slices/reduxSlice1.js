// // src/features/counterSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const counterSlice = createSlice({
//   name: 'counter',
//   initialState: { value: 0 },
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload;
//     },
//   },
// });

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// export default counterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    data: [],
  };

  const reduxSlice1 = createSlice({
    name: "slice1",
    initialState,
    reducers: {
      getAllData: (state, { payload }) => {
        state.data = payload;
      },
      aprroveddata: (state, { payload }) => {
        // find User
        const user = state.data.find((item) => item._id == payload);
        // find index of ID
        const index = state.data.findIndex((item) => item._id == payload);
        // update user status
        user.status = "Approved";
        // update the final state
        state.data[index] = user;
      },
      deleteData: ((state,{payload})=>{
        const findByid = state.data.find((item)=> item._id == payload );
        findByid.status = "Rejected";
        const index = state.data.findIndex((item)=> item._id == payload );
        state.data[index] = findByid
      }),
      deleteAllRejected: ((state,{payload})=>{
        state.data = state.data.filter((item) => item.status !== "Rejected");

      })
    },
  });

export const { getAllData, aprroveddata ,deleteData ,deleteAllRejected } = reduxSlice1.actions;
export default reduxSlice1.reducer;
