import React, { FC, useEffect } from 'react'
import {
  Routes, Route, useLocation, useNavigate
} from 'react-router-dom'
import styles from './app.module.css'
import { AppHeader } from '../AppHeader/app-header'
import { fetchData, ingredientsSelector } from '../../services/slices/ingredients'
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
import {
  authorizationSelector, checkAuth, getUser, isLoad
} from '../../services/slices/authorization'
import { useAppDispatch, useAppSelector } from '../../services/slices'
import { FeedPage } from '../../pages/FeedPage/feed-page'

export const App: FC = () => {
  const dispatch = useAppDispatch()
  const { isAuthChecked } = useAppSelector(authorizationSelector)
  const { ingredients, isLoading, hasError } = useAppSelector(ingredientsSelector)
  const location = useLocation()
  const history = useNavigate()
  const background: string | null = location.state?.background

  const handleModalClose = (): void => {
    history(-1)
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  useEffect(() => {
    if (!isAuthChecked) { dispatch(checkAuth()) }
  }, [])

  useEffect(() => {
    const get = async (): Promise<void> => {
      await dispatch(getUser())
    }
    const load = async (): Promise<void> => {
      await dispatch(isLoad())
    }
    isAuthChecked && get()
    void load()
  }, [isAuthChecked])

  return (
    <div className={styles.app}>
      <AppHeader />
      {!isLoading && !hasError && (ingredients.length > 0) &&
              (
              <Routes location={background ?? location}>
                <Route
                  path="/login"
                  element={<ProtectedRoute onlyUnAuth><LoginPage /></ProtectedRoute>}
                />
                <Route
                  path="/forgot-password"
                  element={<ProtectedRoute onlyUnAuth><ForgotPasswordPage /></ProtectedRoute>}
                />
                <Route
                  path="/reset-password"
                  element={<ProtectedRoute onlyUnAuth><ResetPasswordPage /></ProtectedRoute>}
                />
                <Route
                  path="/register"
                  element={<ProtectedRoute onlyUnAuth><RegisterPage /></ProtectedRoute>}
                />
                <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
                <Route
                  path="/profile"
                  element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
                />
                <Route
                  path="/profile/orders"
                  element={<ProtectedRoute><ProfileOrdersPage /></ProtectedRoute>}
                />
                <Route
                  path="/profile/orders/:id"
                  element={<ProtectedRoute><ProfileOrdersPage /></ProtectedRoute>}
                />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/feed/:id" element={<NotFound />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              )}
      {!isLoading && !hasError && (ingredients.length > 0) && background != null && (
      <Routes>
        <Route
          path="/ingredients/:ingredientId"
          element={(
            <Modal header="Детали ингредиента" onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
)}
        />
      </Routes>
      )}
    </div>
  )
}

export default App
