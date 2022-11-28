import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Navigate } from 'react-router-dom'
import React, { useCallback, useState } from 'react'
import styles from './register.module.css'
import { useAuth } from '../../utils/auth'

export const RegisterPage = () => {
  const [form, setValue] = useState({ name: '', email: '', password: '' })

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const auth = useAuth()

  const register = useCallback(
    e => {
      e.preventDefault()
      auth.register(form)
    },
    [auth, form]
  )

  if (auth.user) {
    return (
        <Navigate to="/" replace/>
    )
  }

  return (
      <div className={styles.content}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input name='name' value={form.name} onChange={onChange} placeholder='Имя'/>
        <EmailInput name='email' value={form.email} onChange={onChange} placeholder='E-mail'/>
        <PasswordInput name='password' value={form.password} onChange={onChange} placeholder='Пароль'/>
        <Button onClick={register} htmlType='button'>Зарегистрироваться</Button>
        <div>
          <p className="text text_type_main-small">Уже зарегистрированы?</p>
          <Link className="text text_type_main-small text_color_inactive" to='/login'>Войти</Link>
        </div>
      </div>
  )
}
