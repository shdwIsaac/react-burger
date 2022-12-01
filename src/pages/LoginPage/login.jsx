import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import React, { useCallback, useState } from 'react'
import styles from './login.module.css'
import { useAuth } from '../../utils/auth'

export const LoginPage = () => {
  const [form, setValue] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const auth = useAuth()

  const login = useCallback(
    e => {
      e.preventDefault()
      auth.signIn(form)
      navigate('/profile')
    },
    [auth, form]
  )
  return (
      <div className={styles.content}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput name='email' value={form.email} onChange={onChange} placeholder='E-mail'/>
        <PasswordInput onChange={onChange} value={form.password} name='password' placeholder='Пароль'/>
        <Button onClick={login} htmlType='button'>Войти</Button>
        <div>
          <p className="text text_type_main-small">Вы - новый пользователь?</p>
          <Link className="text text_type_main-small text_color_inactive" to='/register'>Зарегистрироваться</Link>
        </div>
        <div>
          <p className="text text_type_main-small">Забыли пароль?</p>
          <Link className="text text_type_main-small text_color_inactive" to='/forgot-password'>Восстановить
            пароль</Link>
        </div>
      </div>
  )
}
