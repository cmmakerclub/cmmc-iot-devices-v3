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

      // setInterval(() => {
      //
      //   let mockupData = JSON.stringify({
      //     'info': {
      //       'ssid': 'CMMC_Sinet_2.4G',
      //       'flash_size': 4194304,
      //       'flash_id': '1640c8',
      //       'chip_id': 'be9041',
      //       'sdk': '2.1.0(deb1901)',
      //       'mac': '5C:CF:7F:BE:90:41',
      //       'id': '12488769',
      //       'client_id': '12488769',
      //       'device_id': '12488769',
      //       'prefix': 'CMMC/',
      //       'ip': '192.168.1.114',
      //       'version': 0.991
      //     },
      //     'd': {
      //       'myName': 'Mockup-' + (Math.random() * 1000).toFixed(0),
      //       'millis': Date.now(),
      //       'temperature_c': 0,
      //       'humidity_percent_rh': 0,
      //       'state': 0,
      //       'heap': 38152,
      //       'rssi': -60,
      //       'counter': 4,
      //       'subscription': 1
      //     }
      //   })
      //
      //   let obj = JSON.parse(mockupData)
      //   let messageArrived = this.state.messageArrived
      //   messageArrived[obj.d.myName] = {payloadString: mockupData}
      //   this.state.messageArrived = messageArrived
      // }, parseInt(Math.random() * 1000))

      this.__emitChange()
    }

    if (action.type === ActionTypes.MQTT_MESSAGE_ARRIVED) {
      let d = action.data.d
      let messageArrived = this.state.messageArrived
      messageArrived[d.myName] = action.data
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