import { burgerConstructorSelector } from '../../services/slices/burger-constructor'
import styles from './cart.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from 'react'
import { useDrag } from 'react-dnd'
import { DRAG_TYPE } from '../../utils/constatnts'
import { Link, useLocation } from 'react-router-dom'
import { IIngredientElement } from '../../Abstraction/IIngredientElement'
import { useAppSelector } from '../../services/slices'

interface ICart {
  key: string
  ingredient: IIngredientElement
}

export const Cart: FC<ICart> = ({ key, ingredient }) => {
  const { bun, ingredientsConstructor } = useAppSelector(burgerConstructorSelector)
  const location = useLocation()
  const count: number = ingredientsConstructor.filter((x: IIngredientElement) => x._id === ingredient._id).length
  const itemId: string = ingredient._id

  const [, drag] = useDrag({
    type: DRAG_TYPE,
    item: { itemId }
  })

  return (
      <div className={styles.parent}>
        <Link key={ingredient._id} to={{ pathname: `/ingredients/${ingredient._id}` }} state={{ background: location }}>
          <div ref={drag} className={styles.card} key={ingredient._id}>
            <img alt={ingredient.name} src={ingredient.image}/>
            <div className={styles.ingredientPrice}>
              <p className={'text_type_digits-default'}>{ingredient.price}</p>
              <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
            {bun != null && ingredient._id === bun._id && <Counter count={2} size="default"/>}
            {ingredientsConstructor.length !== 0 && count > 0 &&
                <Counter count={count} size="default"/>}
          </div>
        </Link>
      </div>
  )
}
