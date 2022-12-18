import React, { FC } from 'react'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import { Modal } from '../Modal/modal'
import { useDispatch } from 'react-redux'
import { burgerConstructorSelector } from '../../services/slices/burger-constructor'
import { modalSelector, close } from '../../services/slices/modal'
import { DropTarget } from '../DropTarget/drop-target'
import { clearOrder, orderDetailsSelector, send } from '../../services/slices/order-details'
import { useLocation, useNavigate } from 'react-router-dom'
import { authorizationSelector } from '../../services/slices/authorization'
import { Loading } from '../Loading/loading'
import { OrderDetails } from '../OrderDetails/order-details'
import { useAppSelector } from '../../services/slices'

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch()
  const { sum, bun, ingredientsConstructor } = useAppSelector(burgerConstructorSelector)
  const { isOpenOrder } = useAppSelector(modalSelector)
  const { currentOrder } = useAppSelector(orderDetailsSelector)
  const { isAuthChecked } = useAppSelector(authorizationSelector)
  const navigate = useNavigate()
  const location = useLocation()

  const closeModal = (): void => {
    dispatch(close())
    dispatch(clearOrder())
  }

  const doOrder = (): void => {
    if (!isAuthChecked) {
      navigate('/login', { replace: true, state: { from: location.pathname } })
    }
    isAuthChecked && bun != null &&
    dispatch(send({ ingredients: [bun._id, ...ingredientsConstructor.map(ingredient => ingredient._id), bun._id] }))
  }

  return (
      <div className={styles.constructorContent}>
        <DropTarget/>
        <div className={`${styles.controls} pt-10 pl-25`}>
          <div><p className="pt-4 mr-10 text text_type_digits-medium">{sum}<CurrencyIcon
              type="primary"/></p></div>
          <Button htmlType="button" type="primary" onClick={doOrder} size="large">
            Оформить заказ
          </Button>
        </div>
        {isOpenOrder && (<Modal onClose={closeModal}>
              {currentOrder != null ? <OrderDetails/> : <Loading/>}
        </Modal>)
        }
      </div>

  )
}
