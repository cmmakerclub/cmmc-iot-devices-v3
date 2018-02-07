import TypeActions from './constants'
// import { MQTT_Connect, MQTT_Disconnect } from '../MQTT_INIT.js'

let moment = require('moment-timezone')
moment.locale('th')

let initialState = {
  messageArrived: [],
  filterDevices: [],
  devicesOnline: [],
  devicesOffline: [],
  checkedOnline: false,
  checkedOffline: false,
  connection: false,
  lwt: [],
  specificUpdate: '',
  mqtt: {
    host: '',
    port: '',
    clientId: '',
    username: '',
    password: '',
    topic: ''
  }
}

export default (state = initialState, action) => {

  switch (action.type) {

    case TypeActions.MQTT_CONNECT :
      return {
        ...state,
        mqtt: {
          host: action.data.host,
          port: action.data.port,
          clientId: action.data.clientId,
          username: action.data.username,
          password: action.data.password,
          topic: action.data.topic
        }
      }

    case TypeActions.MQTT_DISCONNECT:

      break

    case TypeActions.MQTT_CONNECTION_SUCCESS:
      // console.log('connection should be true')
      state.connection = true
      break

    case TypeActions.MQTT_MESSAGE_ARRIVED:

      // console.log(action.data)
      // let d = action.data.d
      // let info = action.data.info
      // let messageArrived = state.messageArrived
      // let dataOffline = action.data
      // if (state.lwt[info.id].status === 0) {
      //   dataOffline.status = 0
      //   dataOffline.classCardHeader = 'card-header bg-secondary'
      // }
      //
      // if (messageArrived[d.myName] === undefined) {
      //   messageArrived[d.myName] = dataOffline
      // } else {
      //   dataOffline.classCardHeader = 'card-header bg-success'
      //   messageArrived[d.myName] = dataOffline
      //   state.specificUpdate = d.myName
      // }
      //
      // console.log(messageArrived)

      // return state.messageArrived = messageArrived

      break

    case TypeActions.MQTT_FILTER_DEVICES_NAME:

      break

    case TypeActions.CHECKED_ONLINE:

      break

    case TypeActions.CHECKED_OFFLINE:

      break

    case TypeActions.DEVICES_ONLINE:
      if (state.devicesOnline[action.data.d.myName] === undefined) {
        state.devicesOnline[action.data.d.myName] = action.data
      }
      return {...state, devicesOnline: [action.data.d.myName] = action.data}

    case TypeActions.DEVICES_OFFLINE:
      if (state.devicesOffline[action.data.d.myName] === undefined) {
        state.devicesOffline[action.data.d.myName] = action.data
      }
      return {...state, devicesOffline: [action.data.d.myName] = action.data}

    case TypeActions.LWT:

      break

    default:
      return state

  }

}