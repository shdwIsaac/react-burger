import React from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

export const AppHeader = () => {
  return (
        <header className={styles.header}>
            <div className={styles.boxHeader}>
                <a href="#" className={styles.elementHeader}>
                    <BurgerIcon type="primary"/>
                    <p className="pl-2 text text_type_main-default">Конструктор</p>
                </a>
                <a href="#" className={styles.elementHeader}>
                    <ListIcon type="secondary"/>
                    <p className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</p>
                </a>
                <div className={styles.headerLogo}>
                    <Logo/>
                </div>
                <a href="#" className={styles.elementHeader}>
                    <ProfileIcon type="secondary"/>
                    <p className="pl-2 text text_type_main-default text_color_inactive">Личный кабинет</p>
                </a>
            </div>
        </header>
  )
}
