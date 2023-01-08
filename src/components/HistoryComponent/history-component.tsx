import React, { FC } from 'react'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'

export const HistoryComponent: FC = () => {
  const dateFromServer = '2022-10-10T17:33:32.877Z'
  return (
    <div>
      <div>
        <p className="text text_type_main-default">123</p>
        <FormattedDate date={new Date(dateFromServer)} />
      </div>
      <h3>123333</h3>
      <div>
      </div>
    </div>
  )
}
