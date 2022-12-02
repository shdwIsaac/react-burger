import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import React, { useCallback } from 'react'
import styles from './forgot-password.module.css'
import { forgotPassword } from '../../services/slices/authorization'
import { useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { values, handleChange } = useForm({ email: '' })

  const forgot = useCallback(
    async e => {
      e.preventDefault()
      const success = await dispatch(forgotPassword(values))
      success && navigate('/reset-password')
    },
    [values]
  )

  return (
      <div className={styles.content}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <form onSubmit={forgot}>
          <EmailInput name='email' value={values.email} onChange={handleChange} placeholder='Укажите e-mail'/>
          <Button htmlType='submit'>Восстановить</Button>
        </form>
        <div>
          <p className="text text_type_main-small">Вспомнили пароль?</p>
          <Link className="text text_type_main-small text_color_inactive" to='/login'>Войти</Link>
        </div>
      </div>
  )
}
