import React, { useEffect } from 'react'
import { ModalOverlay } from '../ModalOverlay/modal-overlay'
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export const Modal = (props) => {
  const modalRoot = document.getElementById('react-modals')

  const keyDownEscape = (e) => {
    if (e.key === 'Escape') {
      props.onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownEscape)
    return () => {
      document.removeEventListener('keydown', keyDownEscape)
    }
  }, [])

  return ReactDOM.createPortal(
      <>
        <div className={styles.modalContainer}>
          <div className={styles.header}>
            <div className="text text_type_main-medium">
              <p className={styles.headerText}>{props.header}</p>
            </div>
            <div className={styles.titleCloseBtn}>
              <button
                  onClick={() => {
                    props.onClose()
                  }}>
                <CloseIcon type="primary"/>
              </button>
            </div>
          </div>
          <div className={styles.centered}>
            {props.children}
          </div>
        </div>
        <ModalOverlay onClose={props.onClose}/>
      </>, modalRoot
  )
}
Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.element.isRequired
}
