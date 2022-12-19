import React, { FC } from 'react'
import styles from './tab-component.module.css'
import { Cart } from '../Cart/cart'
import { IIngredientElement } from '../../Abstraction/IIngredientElement'

interface IngredientProps {
  name: string
  data: IIngredientElement[]
}

export const TabComponent: FC<IngredientProps> = ({ name, data }) => {
  return (
      <div className={styles.ingredientType}>
        <p className={`${styles.textLeft} text text_type_main-medium pb-6`}>
          {name}
        </p>
        <div className={styles.ingredientsWrapper}>
          {data.map((ingredient) => {
            return <Cart key={ingredient._id} ingredient={ingredient}/>
          })}
        </div>
      </div>
  )
}
