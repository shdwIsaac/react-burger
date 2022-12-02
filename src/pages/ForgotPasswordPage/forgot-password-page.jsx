import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import React, { useCallback, useState } from 'react'
import styles from './forgot-password.module.css'
import { forgotPassword } from '../../services/slices/authorization'
import { useDispatch } from 'react-redux'

export const ForgotPasswordPage = () => {
  const [form, setValue] = useState({ email: '' })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const forgot = useCallback(
    async e => {
      e.preventDefault()
      const success = await dispatch(forgotPassword(form))
      success && navigate('/reset-password')
    },
    [form]
  )

  return (
      <div className={styles.content}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput name='email' value={form.email} onChange={onChange} placeholder='Укажите e-mail'/>
        <Button onClick={forgot} htmlType='button'>Восстановить</Button>
        <div>
          <p className="text text_type_main-small">Вспомнили пароль?</p>
          <Link className="text text_type_main-small text_color_inactive" to='/login'>Войти</Link>
        </div>
      </div>
  )
}
