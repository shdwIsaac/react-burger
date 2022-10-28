import React from "react";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import './app-header-module.css'


export const AppHeader = () => {
    return(
        <>
            <div className="header-wrapper">
                <div className="box-header">
                    <div className="element-header">
                        <BurgerIcon type="primary" />
                        <p className="pl-2 text text_type_main-default">Конструктор</p>
                    </div>
                    <div className="element-header">
                        <ListIcon type="secondary" />
                        <p className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</p>
                    </div>
                    <div className="header-logo">
                        <Logo/>
                    </div>
                    <div className="element-header">
                        <ProfileIcon type="secondary" />
                        <p className="pl-2 text text_type_main-default text_color_inactive">Личный кабинет</p>
                    </div>
                </div>
            </div>
           
        </>
    );
}