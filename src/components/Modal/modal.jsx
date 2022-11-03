import React, {useEffect} from "react";
import {ModalOverlay} from "../ModalOverlay/modal-overlay";
import './modal-module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalPropTypes} from "./modal-prop-types";
import ReactDOM from "react-dom";

export const Modal = (props) => {

    const modalRoot = document.getElementById("react-modals");

    const keyDownEscape = (e) => {
        if (e.key === 'Escape') {
            props.setShowPopup(false);
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

        <div className="modalContainer">
            <div className="header">
                <div className="text text_type_main-medium">
                    <p className="headerText">{props.header}</p>
                </div>
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            props.setShowPopup(false);
                        }}>
                        <CloseIcon type="primary" />
                    </button>
                </div>
            </div>
            <div className="centered">
                {props.children}
            </div>
        </div>
            <ModalOverlay setShowPopup={props.setShowPopup}/>
        </>, modalRoot
    ) };
Modal.propTypes=ModalPropTypes;