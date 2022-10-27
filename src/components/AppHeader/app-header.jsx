import React from "react";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import './app-header-module.css'


export const AppHeader = () => {
    return(
        <>
            <div className="box-header">
                <div style={{maxWidth: '80%', margin: 'auto', display: 'flex' }}>
                    <div className="element-header" style={{ display: 'flex' }}>
                        <BurgerIcon type="primary" />
                        <p className="pl-2 text text_type_main-default">Конструктор</p>
                    </div>
                    <div className="element-header" style={{ display: 'flex' }}>
                        <ListIcon type="secondary" />
                        <p className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</p>
                    </div>
                    <div >
                        <Logo/>
                    </div>
                    <div className="element-header" style={{ display: 'flex' }}>
                        <ProfileIcon type="secondary" />
                        <p className="pl-2 text text_type_main-default text_color_inactive">Личный кабинет</p>
                    </div>
                </div>
            </div>
        </>
    );
}