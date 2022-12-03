import { combineReducers } from 'redux'

import { ingredientsSlice } from './ingredients'
import { ingredientDetailsSlice } from './Ingredient-details'
import { burgerConstructorSlice } from './burger-constructor'
import { orderDetailsSlice } from './order-details'
import { modalSlice } from './modal'
import { authorizationSlice } from './authorization'

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  ingredientDetails: ingredientDetailsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  modal: modalSlice.reducer,
  authorization: authorizationSlice.reducer
})
