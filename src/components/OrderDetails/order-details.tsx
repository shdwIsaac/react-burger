import React, { FC } from 'react'
import Accepted from '../../images/accepted.png'
import styles from './order-details.module.css'
import { orderDetailsSelector } from '../../services/slices/order-details'
import { useAppSelector } from '../../services/slices'

export const OrderDetails: FC = () => {
  const { currentOrder } = useAppSelector(orderDetailsSelector)

  return (
      <>
        <p className="text text_type_digits-large">{currentOrder?.order.number}</p>
        <p className="text text_type_main-medium">идентификатор заказа</p>
        <img alt='checked' className={`${styles.accepted} mb-15 mt-15`} src={Accepted}/>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className="mt-2 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
          станции</p>
      </>
  )
}
