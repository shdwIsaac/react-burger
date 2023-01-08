import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from '@reduxjs/toolkit'
import { RootState } from '../slices'

export interface IWSAction {
  wsConnect: ActionCreatorWithPayload<string>
  wsDisconnect: ActionCreatorWithoutPayload
  wsSendMessage?: ActionCreatorWithPayload<any>
  wsConnecting: ActionCreatorWithoutPayload
  onOpen: ActionCreatorWithoutPayload
  onClose: ActionCreatorWithoutPayload
  onError: ActionCreatorWithPayload<string>
  onMessage: ActionCreatorWithPayload<any>
}

export const socketMiddleware = (wsActions: IWSAction): Middleware<{}, RootState> => {
  return store => {
    let socket: WebSocket | null = null

    return next => action => {
      const { dispatch } = store
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect
      } = wsActions
      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload)
        dispatch(wsConnecting())
      }
      if (socket != null) {
        socket.onopen = event => {
          dispatch(onOpen())
        }

        socket.onerror = event => {
          dispatch(onError('Error'))
        }

        socket.onmessage = event => {
          const { data } = event
          const parsedData = JSON.parse(data)

          dispatch(onMessage(parsedData))
        }

        socket.onclose = event => {
          dispatch(onClose())
        }

        if ((wsSendMessage?.match(action)) ?? false) {
          socket.send(JSON.stringify(action.payload))
        }
        if (wsDisconnect.match(action)) {
          socket.close()
          socket = null
        }
      }

      next(action)
    }
  }
}
