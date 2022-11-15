import React from "react";
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'


export const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.boxHeader}>
                <div className={styles.elementHeader}>
                    <BurgerIcon type="primary"/>
                    <p className="pl-2 text text_type_main-default">Конструктор</p>
                </div>
                <div className={styles.elementHeader}>
                    <ListIcon type="secondary"/>
                    <p className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</p>
                </div>
                <div className={styles.headerLogo}>
                    <Logo/>
                </div>
                <div className={styles.elementHeader}>
                    <ProfileIcon type="secondary"/>
                    <p className="pl-2 text text_type_main-default text_color_inactive">Личный кабинет</p>
                </div>
            </div>
        </header>
    );
}