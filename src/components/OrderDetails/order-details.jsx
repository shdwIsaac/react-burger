import React from "react";
import {Modal} from "../Modal/modal";
import Accepted from '../../images/accepted.png';
import styles from './order-details.module.css'
import {OrderDetailsPropTypes} from "./order-details-prop-types";

export const OrderDetails = (props) => {


    return (
        <>
            <p className="text text_type_digits-large">034536</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img className={`${styles.accepted} mb-15 mt-15`} src={Accepted}/>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="mt-2 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                станции</p>
        </>
    )
}
OrderDetails.propTypes = OrderDetailsPropTypes;