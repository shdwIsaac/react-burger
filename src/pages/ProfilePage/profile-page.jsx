import React, { useState } from 'react'
import styles from './profile-page.module.css'
import { Link } from 'react-router-dom'
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

export const ProfilePage = () => {
  const [form, setValue] = useState({ name: '', email: '', password: '' })

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  return (
      <div className={styles.content}>
        <div>
          <Link >
            <h2 className="text text_type_main-large">Профиль</h2>
          </Link>
          <Link >
            <h2 className="text text_type_main-large">История заказов</h2>
          </Link>
          <Link >
            <h2 className="text text_type_main-large">Выход</h2>
          </Link>
        </div>
       <div>
         <Input name='name' value={form.name} onChange={onChange} placeholder='Имя'/>
         <EmailInput name='email' value={form.email} onChange={onChange} placeholder='E-mail'/>
         <PasswordInput name='password' value={form.password} onChange={onChange} placeholder='Пароль'/>
       </div>
      </div>

  )
}
