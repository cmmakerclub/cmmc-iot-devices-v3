import mqtt from "mqtt";
import TypeActions from "./redux/constants";
import store from "./redux/store";

let moment = require("moment-timezone");
moment.locale("th");

window.MQTTGlobal = "";

const MQTT_Connect = (init) => {

	console.log(init);

	let options = {
		clientId: init.clientId,
		clean: true,
		port: parseInt(init.port, 0)
	};

	if (init.username || init.password) {
		options.username = init.username;
		options.password = init.password;
	}

	let client = mqtt.connect("mqtt://" + init.host, options);

	client.on("connect", function() {
		console.log("init", init);
		client.subscribe(init.topic);
		// client.publish("CMMC/4639313/$/command", "OFF")
		window.MQTTGlobal = client;
		store.dispatch({
			type: TypeActions.MQTT_CONNECTION_SUCCESS
		});
	});

	client.on("message", function(topic, message, packet) {
		if (topic.split("N-").length < 2) {
			return;
		}
		try {
			let messageIncome = JSON.parse(message.toString());

			console.log(messageIncome);

			//if (messageIncome.status !== undefined && messageIncome.id !== undefined) { // lwt check
			//	store.dispatch({
			//		type: TypeActions.LWT,
			//		data: messageIncome
			//	});
			//}

			if (messageIncome.d && messageIncome.info) {
				messageIncome.d.timestamp = moment.now();
				//store.dispatch({
				//	type: TypeActions.MQTT_MESSAGE_ARRIVED,
				//	data: messageIncome
				//});

				let diff_ms = moment.now() - messageIncome.d.server_timestamp;
				let diff_s = diff_ms/1000;
				//console.log(`[diff]  ${messageIncome.d.myName} = ${diff_ms}`);
				if (packet.retain) {
					if (diff_s < 3600) {
						messageIncome.classCardHeader = `card-header bg-success ${diff_s}`;
						store.dispatch({
							type: TypeActions.MQTT_MESSAGE_ARRIVED,
							data: messageIncome
						});
					} else {
						messageIncome.classCardHeader = `card-header bg-secondary ${diff_s}`;
						store.dispatch({
							type: TypeActions.MQTT_MESSAGE_ARRIVED,
							data: messageIncome
						});
					}

				} else {
					console.log("here");
					messageIncome.classCardHeader = "card-header bg-success  x";
					store.dispatch({
						type: TypeActions.MQTT_MESSAGE_ARRIVED,
						data: messageIncome
					});
				}
			}

		} catch (e) {

		}

	});

};

const MQTT_Reconnect = () => {
	window.MQTTGlobal.reconnect();
};

const MQTT_Disconnect = () => {
	window.MQTTGlobal.end();
	store.dispatch({
		type: TypeActions.MQTT_DISCONNECT
	});
};

const MQTT_Publish = (topic, value) => {
	// console.log(topic, value)
	// console.log(window.MQTTGlobal)
	// debugger
	window.MQTTGlobal.publish(topic, value);
};

export {
	MQTT_Connect,
	MQTT_Disconnect,
	MQTT_Reconnect,
	MQTT_Publish
};
