import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import React, { useCallback, useEffect } from 'react'
import styles from './reset-password.module.css'
import { resetPassword } from '../../services/slices/authorization'
import { useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'

export const ResetPasswordPage = () => {
  const { values, handleChange } = useForm({ password: '', token: '' })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('reset') !== 'true') {
      navigate('/forgot-password')
    }
  }, []
  )

  const reset = useCallback(
    e => {
      e.preventDefault()
      dispatch(resetPassword(values))
      navigate('/login')
    },
    [values]
  )

  return (
      <div className={styles.content}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <form onSubmit={reset}>
          <PasswordInput name='password' value={values.password} onChange={handleChange} placeholder='Введите новый пароль'/>
          <Input name='token' value={values.token} onChange={handleChange} placeholder='Введите код из письма'/>
          <Button htmlType='submit'>Сохранить</Button>
        </form>
        <div>
          <p className="text text_type_main-small">Вспомнили пароль?</p>
          <Link className="text text_type_main-small text_color_inactive" to='/login'>Войти</Link>
        </div>
      </div>
  )
}
