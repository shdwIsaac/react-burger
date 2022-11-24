import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bun: null,
  ingredientsConstructor: [],
  sum: 0,
  bunPrice: 0
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, { payload }) => {
      if (payload) {
        if (payload.type === 'bun') {
          state.sum -= state.bunPrice
          state.bunPrice = payload.price * 2
          state.sum += state.bunPrice
          state.bun = payload
        } else {
          state.ingredientsConstructor.push(payload)
          state.sum += payload.price
        }
      }
    },
    deleteIngredient: (state, { payload }) => {
      if (payload > -1) {
        state.sum -= state.ingredientsConstructor[payload].price
        state.ingredientsConstructor.splice(payload, 1)
      }
    },
    moveIngredient: (state, { payload }) => {
      const element = state.ingredientsConstructor[payload.fromIndex]
      state.ingredientsConstructor.splice(payload.fromIndex, 1)
      state.ingredientsConstructor.splice(payload.toIndex, 0, element)
    }
  }
}
)

export const { addIngredient, deleteIngredient, moveIngredient } = burgerConstructorSlice.actions

export const burgerConstructorSelector = state => state.burgerConstructor
