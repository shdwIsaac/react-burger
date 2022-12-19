import { combineReducers } from 'redux'

import { ingredientsSlice } from './ingredients'
import { burgerConstructorSlice } from './burger-constructor'
import { orderDetailsSlice } from './order-details'
import { modalSlice } from './modal'
import { authorizationSlice } from './authorization'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { store } from '../../index'

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  modal: modalSlice.reducer,
  authorization: authorizationSlice.reducer
})
export type RootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
