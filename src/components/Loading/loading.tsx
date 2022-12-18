import React, { FC } from 'react'
import styles from './loading.module.css'
export const Loading: FC = () => {
  return (
      <div className={styles.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
  )
}
