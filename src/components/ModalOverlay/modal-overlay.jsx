import React from 'react'
import styles from './modal-overlay.module.css'
import { useNavigate } from 'react-router-dom'

export const ModalOverlay = () => {
  const history = useNavigate()

  return (
    <div onClick={() => { history(-1) }} className={styles.backdrop}>
    </div>)
}
