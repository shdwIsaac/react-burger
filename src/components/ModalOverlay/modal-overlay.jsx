import React from "react";
import './modal-overlay-module.css'
import {ModalOverlayPropTypes} from "./modal-overlay-prop-types";

export const ModalOverlay = (props) => {
    return <div onClick={() => {
        props.setShowPopup(false);
    }} className="backdrop">
        {props.children}
    </div>;
};
ModalOverlay.propTypes=ModalOverlayPropTypes;