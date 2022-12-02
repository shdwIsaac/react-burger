import React from 'react'
import styles from './modal-overlay.module.css'

export const ModalOverlay = (props) => {
  return (
      // eslint-disable-next-line react/prop-types
      <div onClick={() => { props.onClose() }} className={styles.backdrop}>
      </div>)
}
