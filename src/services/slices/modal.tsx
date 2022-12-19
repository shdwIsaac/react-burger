import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './index'

const initialState = {
  isOpenOrder: false,
  isOpenIngredient: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openOrderPopup: (state) => {
      state.isOpenOrder = true
    },
    openIngredientPopup: (state) => {
      state.isOpenIngredient = true
    },
    close: (state) => {
      state.isOpenIngredient = false
      state.isOpenOrder = false
    }
  }
})

export const { openOrderPopup, openIngredientPopup, close } = modalSlice.actions

export const modalSelector = (state: RootState): RootState['modal'] => state.modal
