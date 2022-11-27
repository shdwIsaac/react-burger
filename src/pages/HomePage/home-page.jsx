import styles from './home-page.module.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BurgerIngredients } from '../../components/BurgerIngredients/burger-ingredients'
import { BurgerConstructor } from '../../components/BurgerConstructor/burger-constructor'
import React from 'react'

export const HomePage = () => {
  return (
        <div className={styles.appContent}>

            <DndProvider backend={HTML5Backend}>
                <div className={styles.appContentConstructor}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </div>
            </DndProvider>

        </div>
  )
}
