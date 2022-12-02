import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './reset-password.module.css'
import { resetPassword } from '../../services/slices/authorization'
import { useDispatch } from 'react-redux'

export const ResetPasswordPage = () => {
  const [form, setValue] = useState({ password: '', token: '' })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (localStorage.getItem('reset') !== 'true') {
      navigate('/forgot-password')
    }
  }, []
  )

  const reset = useCallback(
    e => {
      e.preventDefault()
      dispatch(resetPassword(form))
      navigate('/login')
    },
    [form]
  )

  return (
      <div className={styles.content}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput name='password' value={form.password} onChange={onChange} placeholder='Введите новый пароль'/>
        <Input name='token' value={form.token} onChange={onChange} placeholder='Введите код из письма'/>
        <Button onClick={reset} htmlType='button'>Сохранить</Button>
        <div>
          <p className="text text_type_main-small">Вспомнили пароль?</p>
          <Link className="text text_type_main-small text_color_inactive" to='/login'>Войти</Link>
        </div>
      </div>
  )
}
