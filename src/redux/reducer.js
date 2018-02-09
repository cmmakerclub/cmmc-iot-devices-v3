import TypeActions from './constants'

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
      } else {
        state.arrayDevices.forEach((device, idx) => {
          if (device.d.myName === action.data.d.myName) {
            state.arrayDevices[idx] = action.data
          }
        })
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
      state.lwt[`id-${action.data.id}`] = action.data
      break

    default:
      //console.log('default state')
      return state

  }

}