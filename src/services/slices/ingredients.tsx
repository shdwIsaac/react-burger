import { createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/constatnts'
import { request } from '../../utils/api'
import { RootState } from './index'
import { IIngredientElement } from '../../Abstraction/IIngredientElement'

interface IInitial {
  isLoading: boolean
  hasError: boolean
  ingredients: IIngredientElement[]
}

const initialState: IInitial = {
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

export const ingredientsSelector = (state: RootState): RootState['ingredients'] => state.ingredients

export function fetchData (): any {
  return async function (dispatch: any) {
    dispatch(getData())
    try {
      await request(BASE_URL + ingredientsSlice.name)
        .then(data => dispatch(getDataSuccess((data as any).data)))
    } catch (error) {
      dispatch(getDataFailure)
    }
  }
}
