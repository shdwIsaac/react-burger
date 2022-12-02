import { createSlice } from '@reduxjs/toolkit'
import { openOrderPopup } from './modal'
import { BASE_URL } from '../../utils/constatnts'
import { clearIngredients } from './burger-constructor'

const initialState = {
  currentOrder: null
}

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    createOrder: (state, { payload }) => {
      state.currentOrder = payload
    }
  }
})

export const { createOrder } = orderDetailsSlice.actions

export const orderDetailsSelector = state => state.orderDetails

export function send (order) {
  return async function (dispatch) {
    const postRequest = BASE_URL + 'orders'
    try {
      const response = await fetch(postRequest, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      })
      if (!response.ok) {
        throw new Error('Ответ сети был не ok.')
      }
      const data = await response.json()
      dispatch(createOrder(data))
      dispatch(openOrderPopup())
      dispatch(clearIngredients())
    } catch (error) {
      console.log('error', error)
    }
  }
}
