import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import styles from './reset-password.module.css'

export const ResetPasswordPage = () => {
  const [form, setValue] = useState({ email: '', code: '' })

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  return (
      <div className={styles.content}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput name='password' value={form.email} onChange={onChange} placeholder='Введите новый пароль'/>
        <Input name='code' value={form.code} onChange={onChange} placeholder='Введите код из письма'/>
        <Button htmlType='button'>Сохранить</Button>
        <div>
          <p className="text text_type_main-small">Вспомнили пароль?</p>
          <Link className="text text_type_main-small text_color_inactive" to='/login'>Войти</Link>
        </div>
      </div>
  )
}
