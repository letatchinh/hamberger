import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    totalBill : 2,
    order : {
      salad : 0,
    bacon : 0,
    cheese : 0,
    meat : 0
    }
    
}
 export const burgerSlice = createSlice({
   name : 'burgerSlice',
     initialState,
     reducers : {
        incrementByAmount: (state, action) => {
            state.order[action.payload.name] += 1
            state.totalBill  = parseFloat((state.totalBill + (action.payload.price)).toFixed(2))
          },
        decrementByAmount: (state, action) => {
            state.order[action.payload.name] -= 1
            state.totalBill  = parseFloat((state.totalBill - (action.payload.price)).toFixed(2))

          },
        resetBurger : (state) => {
          state.order = {
            salad : 0,
    bacon : 0,
    cheese : 0,
    meat : 0
          }
          state.totalBill = 2
        } 
      
     }
 })
 export const  {incrementByAmount , decrementByAmount , resetBurger} = burgerSlice.actions
 export default burgerSlice.reducer

