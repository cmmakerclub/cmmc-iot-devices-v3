import React, { Component } from 'react'
import { MQTT_Disconnect, MQTT_Reconnect } from '../mqtt.init'
import classnames from 'classnames'
import ActionTypes from '../redux/constants'

export default class Header extends Component {

  constructor (props) {
    super(props)
    this.store = this.props.store
    this.getState = this.store.getState()
    this.toggleState = false
    this.search_device = ''
    this.checkedOnline = false
    this.checkedOffline = false
  }

  handleOnChangeTextFilter = (e) => {
    e.preventDefault()
    this.search_device = e.target.value
    this.store.dispatch({
      type: ActionTypes.MQTT_FILTER_DEVICES_NAME,
      data: e.target.value
    })
  }

  filterOnline = () => {
    this.store.dispatch({
      type: ActionTypes.MQTT_FILTER_DEVICES_NAME,
      data: this.search_device
    })
  }

  handleOnCheckedOnline = (e) => {

    this.checkedOnline = e.target.checked

    if (e.target.checked || (!this.checkedOnline && !this.checkedOffline)) {
      this.filterOnline()
    }

    this.store.dispatch({
      type: ActionTypes.CHECKED_ONLINE,
      data: e.target.checked
    })

  }

  handleOnCheckedOffline = (e) => {

    this.checkedOffline = e.target.checked

    if (!this.checkedOnline && !this.checkedOffline) {
      this.filterOnline()
    }

    if (e.target.checked) {
      this.store.dispatch({
        type: ActionTypes.CHECKED_OFFLINE,
        data: this.search_device
      })
    }

    this.store.dispatch({
      type: ActionTypes.CHECKED_OFFLINE,
      data: e.target.checked
    })

  }

  handleOnDisconnect = () => {
    if (this.toggleState === false) {
      console.log('handleOnDisconnect')
      MQTT_Disconnect()
      this.toggleState = true
    } else {
      console.log('handleOnReconnect')
      MQTT_Reconnect(this.getState.mqtt)
      this.toggleState = false
    }
  }

  render () {

    let classHeader = classnames({
      block: this.getState.disconnect === 'connected',
      none: this.getState.disconnect !== 'connected'
    })

    let classButton = classnames({
      'btn-danger': this.getState.connection === true,
      'btn-success': this.getState.connection === false
    })

    let textButton = classnames({
      Disconnect: this.getState.connection === true,
      Connect: this.getState.connection === false
    })

    return (
      <div className="col-12 col-md-12"
           style={{marginBottom: 20, display: classHeader}}>
        <div className="from-group">
          <div className="card">
            <div className="card-body">

              <div className="row">
                <div className="col-12 col-md-7">
                  <input type="text" className='form-control' placeholder='Filter device by name ...'
                         onChange={this.handleOnChangeTextFilter}/>
                </div>
                <div className="col-12 col-md-3 text-center col-form-label">

                  <div className="form-check form-check-inline">
                    <input type="checkbox" className="form-check-input" onChange={this.handleOnCheckedOnline}/>
                    <label className="form-check-label text-success">Online</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input type="checkbox" className="form-check-input" onChange={this.handleOnCheckedOffline}/>
                    <label className="form-check-label text-secondary">Offline</label>
                  </div>

                </div>
                <div className="col-12 col-md-2">
                  <div className="form-group">
                    <button type='button' className={'btn ' + classButton} style={{width: '100%'}}
                            onClick={this.handleOnDisconnect}>
                      {textButton}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

}