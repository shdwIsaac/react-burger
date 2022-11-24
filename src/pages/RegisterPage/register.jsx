import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import styles from './register.module.css'

export const RegisterPage = () => {
  const [form, setValue] = useState({ name: '', email: '', password: '' })

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  return (
        <div className={styles.content}>
            <h2 className="text text_type_main-medium">Регистрация</h2>
            <Input value={form.name} onChange={onChange} placeholder={'Имя'}/>
            <Input value={form.email} onChange={onChange} placeholder={'E-mail'}/>
            <PasswordInput onChange={onChange} value={form.password} name={'Пароль'} placeholder={'Пароль'}/>
            <Button htmlType='button'>Зарегистрироваться</Button>
                <div>
                    <p className="text text_type_main-small">Уже зарегистрированы?</p>
                    <Link className="text text_type_main-small text_color_inactive" to='/login'>Войти</Link>
                </div>
        </div>
  )
}
