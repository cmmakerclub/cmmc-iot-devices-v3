import mqtt from 'mqtt'
import Dispatcher from './flux/Dispatcher'
import TypeActions from './flux/Constants'

let moment = require('moment-timezone')
moment.locale('th')

window.MQTTGlobal = ''

const MQTT_Connect = (init) => {

  let options = {
    clientId: init.clientId,
    clean: true,
    port: parseInt(init.port, 0)
  }

  if (init.username || init.password) {
    options.username = init.username
    options.password = init.password
  }

  let client = mqtt.connect('mqtt://' + init.host, options)

  client.on('connect', function () {
    client.subscribe(init.topic)
    window.MQTTGlobal = client
    Dispatcher.dispatch({
      type: TypeActions.MQTT_CONNECTION_SUCCESS,
      data: true
    })
  })

  client.on('message', function (topic, message, packet) {

    try {
      let messageIncome = JSON.parse(message.toString())
      if (messageIncome.d !== undefined && messageIncome.info !== undefined) {

        let data = JSON.parse(message.toString())
        data.d.timestamp = moment.now()

        if (packet.retain) {
          data.classCardHeader = 'card-header bg-secondary'
          Dispatcher.dispatch({
            type: TypeActions.DEVICES_OFFLINE,
            data: JSON.parse(message.toString())
          })
        } else {
          data.classCardHeader = 'card-header bg-success'
        }

        Dispatcher.dispatch({
          type: TypeActions.MQTT_MESSAGE_ARRIVED,
          data: data
        })
      }
    } catch (e) {
      console.log(e)
    }

  })

}

const MQTT_Disconnect = () => {
  window.MQTTGlobal.end()
}

export {
  MQTT_Connect,
  MQTT_Disconnect
}
