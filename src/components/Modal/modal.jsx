import React, {useEffect} from "react";
import {ModalOverlay} from "../ModalOverlay/modal-overlay";
import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import {useDispatch} from "react-redux";
import {close} from "../../services/slices/modal";
import PropTypes from "prop-types";

export const Modal = (props) => {

    const dispatch = useDispatch()
    const modalRoot = document.getElementById("react-modals");

    const keyDownEscape = (e) => {
        if (e.key === 'Escape') {
            dispatch(close())
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', keyDownEscape);
        return () => {
            document.removeEventListener("keydown", keyDownEscape);
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
                                dispatch(close())
                            }}>
                            <CloseIcon type="primary"/>
                        </button>
                    </div>
                </div>
                <div className={styles.centered}>
                    {props.children}
                </div>
            </div>
            <ModalOverlay/>
        </>, modalRoot
    )
};
Modal.propTypes = {
    header: PropTypes.string,
    children: PropTypes.element.isRequired
}