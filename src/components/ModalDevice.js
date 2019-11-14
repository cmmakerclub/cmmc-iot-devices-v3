import React, {Component} from "react";
import Modal from "react-modal";
import uuid from "uuid";
import {MQTT_Publish} from "../mqtt.init";

const customStyles = {
	content: {
		position: "absolute",
		top: "40px",
		left: "40px",
		right: "40px",
		bottom: "40px",
		border: "1px solid #ccc",
		background: "#fff",
		overflow: "auto",
		WebkitOverflowScrolling: "touch",
		borderRadius: "4px",
		outline: "none",
		padding: "20px"
	}
};

export default class ModalDevice extends Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
			dataTable: []
		};

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		Modal.setAppElement("#root");
	}

	openModal() {
		console.log("open click");
		this.setState({ modalIsOpen: true });
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		console.log("do something after open modal");
	}

	closeModal() {
		console.log("close click");
		this.setState({ modalIsOpen: false });
	}

	publish(e, command) {
		e.preventDefault();
		let topic = `CMMC/${this.props.data.info.id}/$/command`;
		MQTT_Publish(topic, command);
	}

	setComponentData(data) {
		let nextProps = data;
		let info = nextProps.data.info;
		let d = nextProps.data.d;

		let dataTable = [];
		Object.keys(d).forEach((keyData, idxData) => {
			let infoTitle = "";
			let infoData = "";

			Object.keys(info).forEach((keyInfo, idxInfo) => {
				if (idxInfo === idxData) {
					infoTitle = keyInfo;
					infoData = info[keyInfo];
				}
			});

			dataTable.push(
				<tr key={uuid()}>
					<td>{keyData}</td>
					<td>{d[keyData]}</td>
					<td>{infoTitle}</td>
					<td>{infoData}</td>
				</tr>
			);
		});
		this.setState({ dataTable: dataTable });
	}

	componentDidMount() {
		this.setComponentData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.setComponentData(nextProps);
	}

	render() {
		return (
			<div>
				<button type='button' className='btn btn-primary' style={{ width: "100%" }} onClick={this.openModal}>
					MORE INFO
				</button>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Example Modal"
				>
					<div className="form-group">
						<table className='table table-bordered'>
							<thead>
							<tr>
								<th>DataKey</th>
								<th>Value</th>
								<th>InfoKey</th>
								<th>Value</th>
							</tr>
							</thead>
							<tbody>
							{this.state.dataTable.map(dataTable => dataTable)}
							</tbody>
						</table>
					</div>
					{/*<div className="form-group float-right">*/}
					{/*  <button type='button' className='btn btn-success' style={{ marginRight: 10 }}*/}
					{/*          onClick={e => this.publish(e, "ON")}>ON*/}
					{/*  </button>*/}
					{/*  <button type='button' className='btn btn-warning' style={{ marginRight: 10, color: "white" }}*/}
					{/*          onClick={e => this.publish(e, "OFF")}>OFF*/}
					{/*  </button>*/}
					{/*  <button type='button' className='btn btn-danger' onClick={this.closeModal}>CLOSE</button>*/}
					{/*</div>*/}
				</Modal>
			</div>
		);
	}
}
