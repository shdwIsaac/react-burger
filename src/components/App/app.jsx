import React, { useEffect } from 'react'
import styles from './app.module.css'
import { AppHeader } from '../AppHeader/app-header'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, ingredientsSelector } from '../../services/slices/ingredients'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { LoginPage } from '../../pages/LoginPage/login'
import { RegisterPage } from '../../pages/RegisterPage/register'
import { HomePage } from '../../pages/HomePage/home-page'
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage/forgot-password-page'
import { ResetPasswordPage } from '../../pages/ResetPasswordPage/reset-password-page'
import { ProfilePage } from '../../pages/ProfilePage/profile-page'
import { IngredientDetails } from '../IngredientDetails/ingredient-details'
import { Modal } from '../Modal/modal'
import { ProtectedRoute } from '../protected-route'
import { NotFound } from '../../pages/NotFound/not-found'
import { ProfileOrdersPage } from '../../pages/ProfileOrdersPage/profile-orders-page'
import { authorizationSelector, checkAuth } from '../../services/slices/authorization'

function App () {
  const dispatch = useDispatch()
  const { isAuthChecked } = useSelector(authorizationSelector)
  const { ingredients, isLoading, hasError } = useSelector(ingredientsSelector)
  const location = useLocation()
  const history = useNavigate()
  const background = location.state && location.state.background

  const handleModalClose = () => {
    history(-1)
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  useEffect(() => {
    if (!isAuthChecked) { dispatch(checkAuth()) }
  }, [])

  return (
      <>
        <div className={styles.app}>
          <AppHeader/>
          {!isLoading && !hasError && ingredients.length &&
              <Routes location={background || location}>
                <Route path='/login' exact={true}
                       element={<ProtectedRoute onlyUnAuth={true}><LoginPage/></ProtectedRoute>}/>
                <Route path='/forgot-password' exact={true}
                       element={<ProtectedRoute onlyUnAuth={true}><ForgotPasswordPage/></ProtectedRoute>}/>
                <Route path='/reset-password' exact={true}
                       element={<ProtectedRoute onlyUnAuth={true}><ResetPasswordPage/></ProtectedRoute>}/>
                <Route path='/register' exact={true}
                       element={<ProtectedRoute onlyUnAuth={true}><RegisterPage/></ProtectedRoute>}/>
                <Route path='/ingredients/:ingredientId' exact element={<IngredientDetails/>}/>
                <Route path='/profile' exact={true}
                       element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                <Route path='/profile/orders' exact={true}
                       element={<ProtectedRoute><ProfileOrdersPage/></ProtectedRoute>}/>
                <Route path='/' element={<HomePage/>}/>
                <Route path='*' element={<NotFound/>}/>
              </Routes>
          }
          {!isLoading && !hasError && ingredients.length && background && (
              <Routes>
                <Route
                    path='/ingredients/:ingredientId'
                    /* eslint-disable-next-line react/no-children-prop */
                    element={<Modal header='Детали ингредиента' onClose={handleModalClose}>
                      <IngredientDetails/>
                    </Modal>}/>
              </Routes>
          )}
        </div>
      </>)
}

export default App
