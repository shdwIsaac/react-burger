import { burgerConstructorSelector } from '../../services/slices/burger-constructor'
import styles from './cart.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDrag } from 'react-dnd'
import PropTypes from 'prop-types'
import { DRAG_TYPE } from '../../utils/constatnts'
import { Link } from 'react-router-dom'

export const Cart = (props) => {
  const { bun, ingredientsConstructor } = useSelector(burgerConstructorSelector)
  const id = props.ingredient._id

  const count = ingredientsConstructor.filter(x => x._id === id).length

  const [, drag] = useDrag({
    type: DRAG_TYPE,
    item: { id }
  })

  return (
      <Link key={id} to={{ pathname: `/ingredients/${id}`, state: { background: location } }}>
        <div ref={drag} className={styles.card} key={props.ingredient._id}>
          <img src={props.ingredient.image}/>
          <div className={styles.ingredientPrice}>
            <p className={'text_type_digits-default'}>{props.ingredient.price}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <p className="text text_type_main-default">{props.ingredient.name}</p>
          {bun && id === bun._id && <Counter count={2} size="default"/>}
          {ingredientsConstructor.length !== 0 && count &&
              <Counter count={count} size="default"/>}
        </div>
      </Link>
  )
}
Cart.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
  }).isRequired
}
