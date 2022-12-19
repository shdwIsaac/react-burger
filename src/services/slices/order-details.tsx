import { createSlice } from '@reduxjs/toolkit'
import { openOrderPopup } from './modal'
import { BASE_URL } from '../../utils/constatnts'
import { clearIngredients } from './burger-constructor'
import { RootState } from './index'
import { IOrder } from '../../Abstraction/IOrder'

interface ICurrentOrder {
  currentOrder: IOrder | null
}

const initialState: ICurrentOrder = {
  currentOrder: null
}

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    createOrder: (state, { payload }) => {
      state.currentOrder = payload
    },
    clearOrder: (state) => {
      state.currentOrder = null
    }
  }
})

export const { createOrder, clearOrder } = orderDetailsSlice.actions

export const orderDetailsSelector = (state: RootState): RootState['orderDetails'] => state.orderDetails

export function send (order: any): any {
  return async function (dispatch: any) {
    dispatch(openOrderPopup())
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
      dispatch(clearIngredients())
    } catch (error) {
      console.log('error', error)
    }
  }
}
