import { useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import styles from './drop-target.module.css'
import React, { FC } from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { addIngredient, burgerConstructorSelector } from '../../services/slices/burger-constructor'
import { ingredientsSelector } from '../../services/slices/ingredients'
import { BurgerElement } from '../BurgerElement/burger-element'
import { DRAG_TYPE } from '../../utils/constatnts'
import { v4 as uuidv4 } from 'uuid'
import { useAppSelector } from '../../services/slices'

export const DropTarget: FC = () => {
  const dispatch = useDispatch()
  const { ingredientsConstructor, bun } = useAppSelector(burgerConstructorSelector)
  const { ingredients } = useAppSelector(ingredientsSelector)

  const [, drop] = useDrop({
    accept: DRAG_TYPE,
    drop (itemId: any) {
      const item = ingredients.find(el => el._id === itemId.id)
      dispatch(addIngredient({ ...item, key: uuidv4() }))
    }
  })

  const scrollStyle = ingredientsConstructor.length !== 0 ? styles.constructorScroll : styles.constructorWithoutScroll

  return (
      <div ref={drop}>
        <div className={styles.bunWrapper}>
          {bun != null && <ConstructorElement type='top' isLocked={true} text={bun.name + ' (вверх)'}
                                      price={bun.price} thumbnail={bun.image}/>}
        </div>
        <div className={scrollStyle}>
          {ingredientsConstructor.length > 0 && ingredientsConstructor.map((ingredient, index) =>
              <BurgerElement key={ingredient.key} ingredient={ingredient} index={index}/>)
          }
        </div>
        <div className={styles.bunWrapper}>
          {bun != null && <ConstructorElement type='bottom' isLocked={true} text={bun.name + ' (низ)'}
                                      price={bun.price} thumbnail={bun.image}/>}
        </div>
      </div>
  )
}
