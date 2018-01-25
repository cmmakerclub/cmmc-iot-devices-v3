import Dispatcher from './flux/Dispatcher'
import TypeActions from './flux/Constants'

const mqtt_dev = () => {

  Dispatcher.dispatch({
    type: TypeActions.MQTT_CONNECTION_SUCCESS,
    data: true
  })

  this.myName = ['mockup.a', 'mockup.b', 'mockup.c', 'mockup.d']
  this.ip = ['1', '2', '3', '4']

  setInterval(() => {

    this.myName.map((myName, idx) => {

      setTimeout(() => {

        Dispatcher.dispatch({
          type: TypeActions.MQTT_MESSAGE_ARRIVED,
          data: {
            'info': {
              'ssid': 'CMMC_Sinet_2.4G',
              'flash_size': 4194304,
              'flash_id': '1640c8',
              'chip_id': 'be9041',
              'sdk': '2.1.0(deb1901)',
              'mac': '5C:CF:7F:BE:90:41',
              'id': '12488769',
              'client_id': '12488769',
              'device_id': '12488769',
              'prefix': 'CMMC/',
              'ip': '192.168.1.' + this.ip[idx],
              'version': 0.991
            },
            'd': {
              'myName': myName,
              'millis': 1516854770912,
              'temperature_c': 0,
              'humidity_percent_rh': 0,
              'state': 0,
              'heap': 38152,
              'rssi': -60,
              'counter': 4,
              'subscription': 1
            }
          }
        })

      }, (Math.random() * 10000).toFixed(0))

    })

  }, 2000)

}

export default mqtt_dev