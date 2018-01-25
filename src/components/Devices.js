import React, { Component } from 'react'
import store from '../flux/Store'
import uuid from 'uuid'

let moment = require('moment-timezone')
moment.locale('th')

export default class Devices extends Component {

  constructor (props) {
    super(props)

    this.state = {
      devices: []
    }

    store.addListener(() => {
      let storeData = store.state.messageArrived
      let listDevices = []
      let stateDevices = this.state.devices

      Object.keys(storeData).forEach((myName, idx) => {
        if (stateDevices[idx] !== undefined) {
          if (storeData[myName].d.timestamp > stateDevices[idx].d.timestamp) {
            storeData[myName].classUpdate = 'text-danger'
          }
        }
        listDevices.push(storeData[myName])
      })

      this.setState({
        devices: listDevices
      })

    })
  }

  componentWillMount () {
    setInterval(() => {
      this.state.devices.map((device, idx) => {
        let d = this.state.devices
        // d[idx].d.timestampAfter = moment(device.d.timestampBefore).fromNow()
        d[idx].classUpdate = 'text-primary'
        this.setState({devices: d})
      })
    }, 1000)
  }

  render () {

    const Component = (props) => {

      let d = props.data.d
      let info = props.data.info

      return (
        <div className="col-3">
          <div className="form-group">
            <div className="card">
              <div className="card-header bg-success">
                <span style={{color: 'white'}}>{d.myName}</span>
              </div>
              <div className="card-body text-primary">
                <p>ip : {info.ip}</p>
                <p>heap : {d.heap}</p>
                <p>run time : {((d.millis / 60000) / 60).toFixed(2)} hour</p>
                <p>millis : {d.millis}</p>
                <p>prefix : {info.prefix}</p>
                <p className={props.data.classUpdate}>
                  <i className='fa fa-clock-o'/>&ensp;
                  {moment(d.timestamp).fromNow()}
                </p>
                <button className='btn btn-primary' style={{width: '100%'}} onClick={this.handleClickInfo}>
                  MORE INFO
                </button>
                {/*<Modal*/}
                {/*isOpen={this.state.modalIsOpen}*/}
                {/*style={styles.customStyle}*/}
                {/*contentLabel="Modal"*/}
                {/*>*/}
                {/*<table className='table table-bordered'>*/}
                {/*<thead>*/}
                {/*<tr>*/}
                {/*<th>Key</th>*/}
                {/*<th>Value</th>*/}
                {/*/!*<th>Data Key</th>*!/*/}
                {/*/!*<th>Value</th>*!/*/}
                {/*</tr>*/}
                {/*</thead>*/}
                {/*<tbody>*/}
                {/*{this.state.tableContent.map(d => d)}*/}
                {/*</tbody>*/}
                {/*</table>*/}
                {/*<button className='btn btn-danger float-right' onClick={this.closeModal}>Close</button>*/}
                {/*</Modal>*/}
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.state.devices.map(obj => <Component key={uuid()} data={obj}/>)
  }

}