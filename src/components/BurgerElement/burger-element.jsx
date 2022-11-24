import styles from './burger-element.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { deleteIngredient, moveIngredient } from '../../services/slices/burger-constructor'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { DRAG_TYPE } from '../../utils/constatnts'

export const BurgerElement = (props) => {
  const index = props.index
  const dispatch = useDispatch()
  const [, drag] = useDrag({
    type: DRAG_TYPE,
    item: { index }
  })
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: DRAG_TYPE,
    collect (monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover (item, monitor) {
      // eslint-disable-next-line no-prototype-builtins
      if (item.hasOwnProperty('index')) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index
        if (dragIndex === hoverIndex) {
          return
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const hoverMiddleY =
                    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
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

  const deleteItem = (index) => {
    dispatch(deleteIngredient(index))
  }
  drag(drop(ref))
  return (
        <div ref={ref} className={styles.ingredientContent} data-handler-id={handlerId}>
            <DragIcon type="primary"/>
            <ConstructorElement extraClass={styles.element} text={props.ingredient.name}
                                isLocked={false} price={props.ingredient.price} thumbnail={props.ingredient.image}
                                handleClose={() => deleteItem(props.index)}/>
        </div>
  )
}
BurgerElement.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
  }).isRequired
}
