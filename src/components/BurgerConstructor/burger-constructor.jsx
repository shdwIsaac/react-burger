import React from 'react'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import { OrderDetails } from '../OrderDetails/order-details'
import { Modal } from '../Modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { burgerConstructorSelector } from '../../services/slices/burger-constructor'
import { modalSelector } from '../../services/slices/modal'
import { DropTarget } from '../DropTarget/drop-target'
import { send } from '../../services/slices/order-details'

export const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const { sum, bun, ingredientsConstructor } = useSelector(burgerConstructorSelector)
  const { isOpenOrder } = useSelector(modalSelector)

  return (
        <div className={styles.constructorContent}>
            <DropTarget/>
            <div className={`${styles.controls} pt-10 pl-25`}>
                <div><p className="pt-4 mr-10 text text_type_digits-medium">{sum}<CurrencyIcon
                    type="primary"/></p></div>
                <Button htmlType="button" type="primary" onClick={
                    () => {
                      bun &&
                        dispatch(send({ ingredients: [bun._id, ...ingredientsConstructor.map(ingredient => ingredient._id), bun._id] }))
                    }
                } size="large">
                    Оформить заказ
                </Button>
            </div>
            {isOpenOrder && (<Modal>
                <OrderDetails/>
            </Modal>)
            }
        </div>

  )
}
