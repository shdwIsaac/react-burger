import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import React, { useCallback } from 'react'
import styles from './register.module.css'
import { register } from '../../services/slices/authorization'
import { useForm } from '../../hooks/useForm'

export const RegisterPage = () => {
  const { values, handleChange } = useForm({ name: '', email: '', password: '' })

  const reg = useCallback(
    e => {
      e.preventDefault()
      register(values)
    },
    [values]
  )

  return (
      <div className={styles.content}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <form onSubmit={reg}>
          <Input name='name' value={values.name} onChange={handleChange} placeholder='Имя'/>
          <EmailInput name='email' value={values.email} onChange={handleChange} placeholder='E-mail'/>
          <PasswordInput name='password' value={values.password} onChange={handleChange} placeholder='Пароль'/>
          <Button htmlType='submit'>Зарегистрироваться</Button>
        </form>
        <div>
          <p className="text text_type_main-small">Уже зарегистрированы?</p>
          <Link className="text text_type_main-small text_color_inactive" to='/login'>Войти</Link>
        </div>
      </div>
  )
}
