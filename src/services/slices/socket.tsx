import { createSlice } from '@reduxjs/toolkit'

interface IWs {
  wsConnected: boolean
  messages: any
}

const initialState: IWs = {
  wsConnected: false,
  messages: []
}

export const socketSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    wsConnection: (state, { payload }) => {
      state.wsConnected = payload
    },
    wsMessage: (state, { payload }) => {
      state.messages = state.messages.length > 0
        ? [...state.messages, {
            payload,
            timestamp: new Date().getTime() / 1000
          }]
        : [{
            payload,
            timestamp: new Date().getTime() / 1000
          }]
    }
  }
})
