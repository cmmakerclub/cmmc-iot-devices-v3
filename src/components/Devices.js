import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import uuid from 'uuid'
import Modal from 'react-modal'
import { initWeightTable } from './Weight.config'
// import { MQTT_Publish } from '../MQTT_INIT'

let moment = require('moment-timezone')
moment.locale('th')

export default class Devices extends Component {

  constructor (props) {
    super(props)
    this.store = this.props.store
    this.getState = this.props.store.getState()
  }

  render () {

    const Component = (props) => {

      let d = props.data.d
      let info = props.data.info

      return (
        <div className="col-12 col-md-3">
          <div className="form-group">
            <div className="card">
              <div className={props.data.classCardHeader}>
                <span style={{color: 'white'}}>{d.myName}</span>
              </div>
              <div className="card-body text-primary">
                <p>ip : {info.ip}</p>
                <p>heap : {d.heap}</p>
                <p>run time : {moment(moment.now() - d.millis).fromNow()}</p>
                <p>millis : {d.millis}</p>
                <p>prefix : {info.prefix}</p>
                <p className={props.data.classUpdate}>
                  <i className='fa fa-clock-o'/>&ensp;
                  {moment(d.timestamp).fromNow()}
                </p>
                <button className='btn btn-primary' style={{width: '100%'}}>
                  MORE INFO
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div id='myDevices' className='row'>
        {
          this.getState.arrayDevices.map(obj => <Component key={obj.d.myName} data={obj}/>)
        }
      </div>
    )
  }

}