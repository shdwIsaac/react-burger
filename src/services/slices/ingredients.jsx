import { createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/constatnts'

const initialState = {
  isLoading: false,
  hasError: false,
  ingredients: []
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getData: state => {
      state.isLoading = true
    },
    getDataSuccess: (state, { payload }) => {
      state.ingredients = payload
      state.isLoading = false
      state.hasError = false
    },
    getDataFailure: state => {
      state.isLoading = false
      state.hasError = true
    }
  }
})

export const { getData, getDataSuccess, getDataFailure } = ingredientsSlice.actions

export const ingredientsSelector = state => state.ingredients

export function fetchData () {
  return async function (dispatch) {
    dispatch(getData())
    try {
      const response = await fetch(BASE_URL + ingredientsSlice.name)
      if (!response.ok) {
        throw new Error('Ответ сети был не ok.')
      }
      const data = await response.json()
      dispatch(getDataSuccess(data.data))
    } catch (error) {
      dispatch(getDataFailure)
      console.log('error', error)
    }
  }
};
