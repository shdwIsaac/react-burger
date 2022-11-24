import React from 'react'
import styles from './tab-component.module.css'
import { Cart } from '../Cart/cart'
import PropTypes from 'prop-types'

export const TabComponent = (props) => {
  return (
        <div className={styles.ingredientType}>
            <p className={`${styles.textLeft} text text_type_main-medium pb-6`}>
                {props.name}
            </p>
            <div className={styles.ingredientsWrapper}>
                {props.data.map((ingredient) => {
                  return <Cart key={ingredient._id} ingredient={ingredient}/>
                })}
            </div>
        </div>
  )
}
TabComponent.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}
