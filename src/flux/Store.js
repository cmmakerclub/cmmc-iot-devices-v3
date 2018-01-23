import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import ActionTypes from './Constants'
import { MQTTConnect, MQTTClearRetain } from '../MQTT_INIT.js'

class MyStore extends Store {

  constructor (props) {
    super(props)
    this.state = {
      messageArrived: [],
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

    if (action.type === ActionTypes.CONNECTING) {
      this.state.mqtt = {
        host: action.data.host,
        port: action.data.port,
        clientId: action.data.clientId,
        username: action.data.username,
        password: action.data.password,
        topic: action.data.topic
      }

      MQTTConnect(this.state.mqtt)
      this.__emitChange()
    }

    if (action.type === ActionTypes.MQTT_CONNECTION_SUCCESS) {
      this.state.connection = true
      this.__emitChange()
    }

    if (action.type === ActionTypes.MQTT_MESSAGE_ARRIVED) {
      let obj = JSON.parse(action.data.payloadString)
      let messageArrived = this.state.messageArrived
      messageArrived[obj.d.myName] = action.data
      this.state.messageArrived = messageArrived
      this.__emitChange()
    }

    if (action.type === ActionTypes.MQTT_CLEAR_RETAIN) {
      MQTTClearRetain(this.state.mqtt.topic)
      this.__emitChange()
    }

  }

}

export default new MyStore(AppDispatcher)