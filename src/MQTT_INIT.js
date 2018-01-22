import mqtt from 'mqtt'
import Dispatcher from './flux/Dispatcher'
import TypeActions from './flux/Constants'

let moment = require('moment-timezone')
moment.locale('th')

window.MQTTGlobal = ''

const MQTTConnect = (init) => {

  console.log(init)

  let options = {
    clientId: init.clientId,
    clean: true,
    port: parseInt(init.port)
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

    let messageIncome = JSON.parse(message.toString())

    if (messageIncome.d !== undefined && messageIncome.info !== undefined) {
      if (packet.retain === false) {
        let data = {
          destinationName: packet.topic,
          payloadString: packet.payload.toString(),
          qos: packet.qos,
          timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
          unix: moment.now(),
          // retained: packet.retain
        }

        Dispatcher.dispatch({
          type: TypeActions.MQTT_MESSAGE_ARRIVED,
          data: data
        })
      }
    }

  })

}

const MQTTClearRetain = (topic) => {
  window.MQTTGlobal.publish(topic, null, {retain: true})
}

export {
  MQTTConnect,
  MQTTClearRetain
}
