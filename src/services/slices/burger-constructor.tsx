import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { IIngredientElement } from '../../abstraction/IIngredientElement'

interface IBurgerConstructor {
  bun: IIngredientElement | null
  ingredientsConstructor: IIngredientElement[]
  sum: number
  bunPrice: number
  key: string | null
}

const initialState: IBurgerConstructor = {
  bun: null,
  ingredientsConstructor: [],
  sum: 0,
  bunPrice: 0,
  key: null
}
export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, { payload }: PayloadAction<any>) => {
      if (payload != null) {
        state.key = payload.key
        if (payload.type === 'bun') {
          state.sum -= state.bunPrice
          state.bunPrice = payload.price * 2
          state.sum += state.bunPrice
          state.bun = payload
        } else {
          state.ingredientsConstructor.push(payload)
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
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
    },
    clearIngredients: (state) => {
      state.bun = null
      state.ingredientsConstructor = []
      state.sum = 0
      state.bunPrice = 0
      state.key = null
    }
  }
}
)

export const { addIngredient, deleteIngredient, moveIngredient, clearIngredients } = burgerConstructorSlice.actions

export const burgerConstructorSelector = (state: RootState): RootState['burgerConstructor'] => state.burgerConstructor
