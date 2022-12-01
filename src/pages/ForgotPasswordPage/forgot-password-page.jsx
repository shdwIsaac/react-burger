import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Navigate } from 'react-router-dom'
import React, { useCallback, useState } from 'react'
import styles from './forgot-password.module.css'
import { useAuth } from '../../utils/auth'

export const ForgotPasswordPage = () => {
  const auth = useAuth()
  const [form, setValue] = useState({ email: '' })

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const forgotPassword = useCallback(
    e => {
      e.preventDefault()
      auth.forgotPassword(form)
      return <Navigate to='/reset-password'/>
    },
    [auth, form]
  )

  return (
      <div className={styles.content}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput name='email' value={form.email} onChange={onChange} placeholder='Укажите e-mail'/>
        <Button onClick={forgotPassword} htmlType='button'>Восстановить</Button>
        <div>
          <p className="text text_type_main-small">Вспомнили пароль?</p>
          <Link className="text text_type_main-small text_color_inactive" to='/login'>Войти</Link>
        </div>
      </div>
  )
}
