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
import { useAuth } from '../../utils/auth'
import { NotFound } from '../../pages/NotFound/not-found'
import { AuthorizedRoute } from '../authorized-route'

function App () {
  const dispatch = useDispatch()
  const auth = useAuth()
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
    auth.getUser()
  }, [])

  return (
      <>
          <div className={styles.app}>
              <AppHeader/>
              {!isLoading && !hasError && ingredients.length &&
                  <Routes location={background || location}>
                    <Route path='/login' exact={true} element={<AuthorizedRoute><LoginPage/></AuthorizedRoute>}/>
                      <Route path='/forgot-password' exact={true} element={<AuthorizedRoute user={auth}><ForgotPasswordPage/></AuthorizedRoute>}/>
                      <Route path='/reset-password' exact={true} element={<AuthorizedRoute user={auth}><ResetPasswordPage/></AuthorizedRoute>}/>
                      <Route path='/register' exact={true} element={<AuthorizedRoute user={auth}><RegisterPage/></AuthorizedRoute>}/>
                    <Route path='/ingredients/:ingredientId' exact element={<IngredientDetails/>}/>
                    <Route path='/profile' exact={true} element={<ProtectedRoute user={auth.user}>
                      <ProfilePage/>
                    </ProtectedRoute>}/>
                      <Route path='/' element={<HomePage/>}/>
                      <Route element={<NotFound/>}/>
                  </Routes>
              }
            {background && (
                <Routes>
                  <Route
                    path='/ingredients/:ingredientId'
                    /* eslint-disable-next-line react/no-children-prop */
                    element={<Modal onClose={handleModalClose}>
                      <IngredientDetails />
                      </Modal>}/>
                  </Routes>
            )}
          </div>
  </>)
}

export default App
