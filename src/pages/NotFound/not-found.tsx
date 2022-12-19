import React, { FC } from 'react'
import styles from './not-found.module.css'

export const NotFound: FC = () => {
  return (
      <div className={styles.content}>
        <h1>Не найдено</h1>
      </div>
  )
}
