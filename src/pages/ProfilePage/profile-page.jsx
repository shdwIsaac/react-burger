import React, { useCallback, useEffect, useState } from 'react'
import styles from './profile-page.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { getUser, signOut, updateUser } from '../../services/slices/authorization'

export const ProfilePage = () => {
  const navigate = useNavigate()
  const [form, setValue] = useState({ name: '', email: '' })

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    getUser()
  }, [])

  const update = useCallback(
    e => {
      e.preventDefault()
      updateUser(form)
    },
    [form]
  )
  const logout = useCallback(
    e => {
      e.preventDefault()
      signOut()
      navigate('/', { replace: true })
    },
    [form]
  )
  return (
      <div className={styles.content}>
        <div>
          <Link to='/profile'>
            <h2 className="text text_type_main-large">Профиль</h2>
          </Link>
          <Link to='/profile/orders'>
            <h2 className="text text_type_main-large">История заказов</h2>
          </Link>
          <Link onClick={logout} to='/login'>
            <h2 className="text text_type_main-large">Выход</h2>
          </Link>
        </div>
       <div>
         <Input name='name' value={form.name} onChange={onChange} placeholder='Имя'/>
         <EmailInput name='email' value={form.email} onChange={onChange} placeholder='E-mail'/>
         <PasswordInput name='password' value='' onChange={onChange} placeholder='Пароль'/>
         <Button htmlType='button' onClick={update}>Сохранить</Button>
       </div>
      </div>

  )
}
