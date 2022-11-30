import { createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/constatnts'
import { request } from '../../utils/api'

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
      await request(BASE_URL + ingredientsSlice.name)
        .then(data => dispatch(getDataSuccess(data.data)))
    } catch (error) {
      dispatch(getDataFailure)
      console.log('error', error)
    }
  }
}
