import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentOrder:null,
}

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {
        createOrder: (state, {payload}) => {
            state.currentOrder = payload
        },
    },
})

export const { createOrder } = orderDetailsSlice.actions

export const orderDetailsSelector = state => state.orderDetails