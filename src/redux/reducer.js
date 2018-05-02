import TypeActions from './constants'

let moment = require('moment-timezone')
moment.locale('th')

let initialState = {
  devices: [],
  arrayDevices: [],
  filterDevices: [],
  devicesOnline: [],
  devicesOffline: [],
  checkedOnline: false,
  checkedOffline: false,
  connection: false,
  disconnect: false,
  lwt: [],
  mqtt: {
    host: '',
    port: '',
    clientId: '',
    username: '',
    password: '',
    topic: ''
  }
}

export default function (state = initialState, action) {

  switch (action.type) {

    case TypeActions.MQTT_CONNECT :
      state.mqtt = {
        host: action.data.host,
        port: action.data.port,
        clientId: action.data.clientId,
        username: action.data.username,
        password: action.data.password,
        topic: action.data.topic
      }
      break

    case TypeActions.MQTT_DISCONNECT:
      state.connection = false
      // console.log('reducer mqtt disconnect')
      break

    case TypeActions.MQTT_CONNECTION_SUCCESS:
      state.connection = true
      state.disconnect = 'connected'
      break

    case TypeActions.MQTT_MESSAGE_ARRIVED:
      if (state.filterDevices.length === 0) {

        // if (state.checkedOnline === false && state.checkedOffline === false) {
        let d = action.data.d
        let info = action.data.info
        let devices = state.devices
        let actionData = action.data

        if (state.lwt[`id-${info.id}`].status === 0) {
          actionData.classCardHeader = 'card-header bg-secondary'
        } else {
          actionData.classCardHeader = 'card-header bg-success'
        }
        devices[d.myName] = actionData
        Object.keys(devices).forEach((key, idx) => {
          state.arrayDevices[idx] = devices[key]
        })
        // }

      } else {

        if (state.checkedOnline === true && state.checkedOffline === false) {
          // console.log('online checked')
          let onlineOnly = []
          state.arrayDevices.forEach(device => {
            if (device.classCardHeader === 'card-header bg-success') {
              onlineOnly.push(device)
            }
          })
          state.arrayDevices = onlineOnly
        }

        if (state.checkedOffline === true && state.checkedOnline === false) {
          // console.log('offline checked')
          let offlineOnly = []
          state.arrayDevices.forEach(device => {
            if (device.classCardHeader === 'card-header bg-secondary') {
              offlineOnly.push(device)
            }
          })
          state.arrayDevices = offlineOnly
        }

        if ((state.checkedOnline === false && state.checkedOffline === false) ||
          (state.checkedOnline === true && state.checkedOffline === true)) {
          // console.log('online unchecked, offline unchecked')
          state.arrayDevices.forEach((device, idx) => {
            if (device.d.myName === action.data.d.myName) {
              state.arrayDevices[idx] = action.data
            }
          })
        }

      }
      break

    case TypeActions.MQTT_FILTER_DEVICES_NAME:
      if (action.data) {
        const search = action.data
        let filterDevices = []
        Object.keys(state.devices).forEach(key => {
          let matchingKey = key.indexOf(search) !== -1
          if (matchingKey) {
            filterDevices.push(state.devices[key])
          }
        })

        state.filterDevices = filterDevices
        state.arrayDevices = filterDevices
      } else {
        state.filterDevices = []
      }
      break

    case TypeActions.CHECKED_ONLINE:
      state.checkedOnline = action.data
      break

    case TypeActions.CHECKED_OFFLINE:
      state.checkedOffline = action.data
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
      state.lwt[`id-${action.data.id}`] = action.data
      break

    default:
      //console.log('default state')
      return state

  }

}