import TypeActions from './constants'
import { MQTT_Connect, MQTT_Disconnect } from '../MQTT_INIT.js'

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

export default (state, action) => {

  switch (action.type) {

    case TypeActions.MQTT_CONNECT :
      return {
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
      return {connection: true}

    case TypeActions.MQTT_MESSAGE_ARRIVED:

      break

    case TypeActions.MQTT_FILTER_DEVICES_NAME:

      break

    case TypeActions.CHECKED_ONLINE:

      break

    case TypeActions.CHECKED_OFFLINE:

      break

    case TypeActions.DEVICES_ONLINE:

      break

    case TypeActions.DEVICES_OFFLINE:

      break

    case TypeActions.LWT:

      break

    default:
      return state

  }

}