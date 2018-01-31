import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import ActionTypes from './Constants'
import { MQTT_Connect, MQTT_Disconnect } from '../MQTT_INIT.js'

let moment = require('moment-timezone')
moment.locale('th')

class MyStore extends Store {

  constructor (props) {
    super(props)
    this.state = {
      messageArrived: [],
      filterDevices: [],
      devicesOnline: [],
      devicesOffline: [],
      checkedOnline: false,
      checkedOffline: false,
      connection: false,
      mqtt: {
        host: '',
        port: '',
        clientId: '',
        username: '',
        password: '',
        topic: ''
      }
    }
  }

  __onDispatch (action) {

    if (action.type === ActionTypes.MQTT_CONNECT) {
      this.state.mqtt = {
        host: action.data.host,
        port: action.data.port,
        clientId: action.data.clientId,
        username: action.data.username,
        password: action.data.password,
        topic: action.data.topic
      }
      MQTT_Connect(this.state.mqtt)
      this.__emitChange()
    }

    if (action.type === ActionTypes.MQTT_DISCONNECT) {
      MQTT_Disconnect()
      this.state.connection = false
      this.messageArrived = []
      this.__emitChange()
    }

    if (action.type === ActionTypes.MQTT_CONNECTION_SUCCESS) {
      this.state.connection = true
      this.__emitChange()
    }

    if (action.type === ActionTypes.MQTT_MESSAGE_ARRIVED) {
      let d = action.data.d
      let messageArrived = this.state.messageArrived
      messageArrived[d.myName] = action.data
      this.state.messageArrived = messageArrived
      this.__emitChange()
    }

    if (action.type === ActionTypes.MQTT_FILTER_DEVICES_NAME) {
      if (action.data) {
        const search = action.data
        let filterDevices = []
        Object.keys(this.state.messageArrived).forEach(key => {
          let matchingKey = key.indexOf(search) !== -1
          if (matchingKey) {
            filterDevices.push(this.state.messageArrived[key])
          }
        })
        this.state.filterDevices = filterDevices
      } else {
        this.state.filterDevices = []
      }
      this.__emitChange()
    }

    if (action.type === ActionTypes.CHECKED_ONLINE) {
      this.state.checkedOnline = action.data
    }

    if (action.type === ActionTypes.CHECKED_OFFLINE) {
      this.state.checkedOffline = action.data
    }

    if (action.type === ActionTypes.DEVICES_ONLINE) {
      let myName = action.data.d.myName
      let data = action.data
      data.d.timestamp = moment.now()
      data.classCardHeader = 'card-header bg-success'
      this.state.devicesOnline[myName] = data
    }

    if (action.type === ActionTypes.DEVICES_OFFLINE) {
      let myName = action.data.d.myName
      let data = action.data
      data.d.timestamp = moment.now()
      data.classCardHeader = 'card-header bg-secondary'
      this.state.devicesOffline[myName] = data
    }

  }

}

export default new MyStore(AppDispatcher)