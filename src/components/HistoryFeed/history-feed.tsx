import React, { FC } from 'react'
import styles from './history-feed.module.css'

export const HistoryFeed: FC = () => {
  return (
    <p className={`${styles.left} pt-10 pb-5 text text_type_main-large`}>Лента заказов</p>
  )
}
