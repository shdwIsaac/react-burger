import React, { FC, useEffect } from 'react'
import { ModalOverlay } from '../ModalOverlay/modal-overlay'
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom'

interface IModal {
  header?: string
  onClose?: () => void
  children: any
}

export const Modal: FC<IModal> = ({ header, onClose, children }) => {
  const modalRoot = document.getElementById('react-modals') as HTMLElement

  const keyDownEscape = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      if (onClose != null) {
        onClose()
      }
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
              <p className={styles.headerText}>{header}</p>
            </div>
            <div className={styles.titleCloseBtn}>
              <button
                  onClick={() => {
                    if (onClose != null) {
                      onClose()
                    }
                  }}>
                <CloseIcon type="primary"/>
              </button>
            </div>
          </div>
          <div className={styles.centered}>
            {children}
          </div>
        </div>
        <ModalOverlay onClose={onClose}/>
      </>, modalRoot
  )
}
