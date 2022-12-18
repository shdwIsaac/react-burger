import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import React, { FC, FormEvent, useCallback } from 'react'
import styles from './login.module.css'
import { signIn } from '../../services/slices/authorization'
import { useForm } from '../../hooks/use-form'
import { useAppDispatch } from '../../services/slices'

export const LoginPage: FC = () => {
  const { values, handleChange } = useForm({ email: '', password: '' })
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const fromPage: string = location.state?.from ?? '/'

  const login = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      void dispatch(signIn(values))
      navigate(fromPage, { replace: true })
    },
    [values]
  )
  return (
      <div className={styles.content}>
        <h2 className="text text_type_main-medium">Вход</h2>
          <form className={styles.inputStyle} onSubmit={login}>
            <EmailInput name='email' value={values.email} onChange={handleChange} placeholder='E-mail'/>
            <PasswordInput onChange={handleChange} value={values.password} name='password' placeholder='Пароль'/>
            <Button htmlType='submit'>Войти</Button>
          </form>
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
