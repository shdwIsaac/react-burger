import React from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { Link, useLocation, matchRoutes } from 'react-router-dom'

export const AppHeader = () => {
  const { pathname } = useLocation()
  const isConstructor = matchRoutes([{ path: '/' }], pathname)
  const isProfile = matchRoutes([{ path: '/profile' }, { path: '/login' }], pathname)

  return (
        <header className={styles.header}>
            <div className={styles.boxHeader}>
                <Link to='/' className={styles.elementHeader}>
                  <BurgerIcon type={!isConstructor ? 'secondary' : 'primary'}/>
                  <p className={'pl-2 text text_type_main-default ' + (!isConstructor ? 'text_color_inactive' : '')}>Конструктор</p>
                </Link>
                <Link className={styles.elementHeader}>
                    <ListIcon type="secondary"/>
                    <p className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</p>
                </Link>
                <div className={styles.headerLogo}>
                    <Logo/>
                </div>
                <Link to='/profile' className={styles.elementHeader}>
                    <ProfileIcon type={!isProfile ? 'secondary' : 'primary'}/>
                    <p className={'pl-2 text text_type_main-default ' + (!isProfile ? 'text_color_inactive' : '')}>Личный кабинет</p>
                </Link>
            </div>
        </header>
  )
}
