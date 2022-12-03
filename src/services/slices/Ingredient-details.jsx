import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedIngredient: null
}

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientsDetails',
  initialState,
  reducers: {
    selectIngredient: (state, { payload }) => {
      state.selectedIngredient = payload
    },
    unselectIngredient: (state) => {
      state.selectedIngredient = null
    }
  }
})

export const { selectIngredient, unselectIngredient } = ingredientDetailsSlice.actions

export const ingredientDetailsSelector = state => state.ingredientDetails
