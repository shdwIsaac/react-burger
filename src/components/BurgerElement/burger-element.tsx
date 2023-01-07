import styles from './burger-element.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC, useRef } from 'react'
import { useDrag, useDrop, XYCoord } from 'react-dnd'
import { deleteIngredient, moveIngredient } from '../../services/slices/burger-constructor'
import { useDispatch } from 'react-redux'
import { DRAG_TYPE } from '../../utils/constatnts'
import { IIngredientElement } from '../../abstraction/IIngredientElement'

interface IBurgerElement {
  index: number
  ingredient: IIngredientElement
}

interface IDragObject {
  id: string
  index: number
}

export const BurgerElement: FC<IBurgerElement> = ({ index, ingredient }) => {
  const dispatch = useDispatch()

  const ref = useRef<HTMLDivElement>(null)

  const [, drag] = useDrag({
    type: DRAG_TYPE,
    item: { index }
  })

  const [{ handlerId }, drop] = useDrop<any, any, any>({
    accept: DRAG_TYPE,
    collect (monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover (item: IDragObject, monitor): void {
      // eslint-disable-next-line no-prototype-builtins
      if (item.hasOwnProperty('index')) {
        if (ref.current == null) {
          return
        }
        const dragIndex: number = item.index
        const hoverIndex = index
        if (dragIndex === hoverIndex) {
          return
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset() as XYCoord
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        dispatch(moveIngredient({ fromIndex: dragIndex, toIndex: hoverIndex }))
        item.index = hoverIndex
      }
    }
  })

  const deleteItem = (index: number): void => {
    dispatch(deleteIngredient(index))
  }
  drag(drop(ref))
  return (
      <div ref={ref} className={styles.ingredientContent} data-handler-id={handlerId}>
        <DragIcon type="primary"/>
        <ConstructorElement extraClass={styles.element} text={ingredient.name}
                            isLocked={false} price={ingredient.price} thumbnail={ingredient.image}
                            handleClose={() => deleteItem(index)}/>
      </div>
  )
}
