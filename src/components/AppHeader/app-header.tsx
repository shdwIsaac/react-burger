import React, { FC } from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { Link, useLocation, matchRoutes } from 'react-router-dom'

export const AppHeader: FC = () => {
  const { pathname } = useLocation()
  const isConstructor: unknown | null = matchRoutes([{ path: '/' }], pathname)
  const isProfile: unknown | null = matchRoutes([{ path: '/profile' }, { path: '/login' }, { path: '/profile/orders' }], pathname)

  return (
      <header className={styles.header}>
        <div className={styles.boxHeader}>
          <Link to='/' className={styles.elementHeader}>
            <BurgerIcon type={(isConstructor == null) ? 'secondary' : 'primary'}/>
            <p className={'pl-2 text text_type_main-default ' + ((isConstructor == null) ? 'text_color_inactive' : '')}>Конструктор</p>
          </Link>
          <Link to='/feed' className={styles.elementHeader}>
            <ListIcon type="secondary"/>
            <p className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</p>
          </Link>
            <Link to='/' className={styles.headerLogo}>
              <Logo/>
            </Link>
          <Link to='/profile' className={styles.elementHeader}>
            <ProfileIcon type={(isProfile == null) ? 'secondary' : 'primary'}/>
            <p className={'pl-2 text text_type_main-default ' + ((isProfile == null) ? 'text_color_inactive' : '')}>Личный
              кабинет</p>
          </Link>
        </div>
      </header>
  )
}
