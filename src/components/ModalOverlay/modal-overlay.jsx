import React from 'react'
import styles from './modal-overlay.module.css'
import { useDispatch } from 'react-redux'
import { close } from '../../services/slices/modal'

export const ModalOverlay = () => {
  const dispatch = useDispatch()

  return (
    <div onClick={() => { dispatch(close()) }} className={styles.backdrop}>
    </div>)
}
