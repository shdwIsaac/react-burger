import React, {useEffect} from "react";
import {ModalOverlay} from "../ModalOverlay/modal-overlay";
import './modal-module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalPropTypes} from "./modal-prop-types";

export const Modal = (props) => {

    const keyDownEscape = (e) => {
        if (e.key === 'Escape') {
            props.setShowPopup(false);
        }
    }

    useEffect(()=>{
        document.addEventListener('keydown', keyDownEscape);
        return () => {
            document.removeEventListener("keydown",keyDownEscape);
        }
    }, [])

    return <ModalOverlay setShowPopup={props.setShowPopup}>
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
            <div>
                {props.children}
            </div>
        </div>
    </ModalOverlay>
};
Modal.propTypes=ModalPropTypes;