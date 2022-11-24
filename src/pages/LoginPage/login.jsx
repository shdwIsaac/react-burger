import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import styles from './login.module.css'

export const LoginPage = () => {
  const [form, setValue] = useState({ email: '', password: '' })

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  return (
        <div className={styles.content}>
            <h2 className="text text_type_main-medium">Вход</h2>
            <Input value={form.email} onChange={onChange} placeholder={'E-mail'}/>
            <PasswordInput onChange={onChange} value={form.password} name={'Пароль'} placeholder={'Пароль'}/>
            <Button htmlType='button'>Войти</Button>
            <div>
                <p className="text text_type_main-small">Вы - новый пользователь?</p>
                <Link className="text text_type_main-small text_color_inactive" to='/register'>Зарегистрироваться</Link>
            </div>
            <div>
                <p className="text text_type_main-small">Забыли пароль?</p>
                <Link className="text text_type_main-small text_color_inactive" to='/forgot-password'>Восстановить пароль</Link>
            </div>
        </div>
  )
}
