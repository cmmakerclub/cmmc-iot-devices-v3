import React, { Component } from 'react'
import TypeActions from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'

export default class Filter extends Component {

  handleOnChangeTextFilter = (e) => {
    e.preventDefault()
    Dispatcher.dispatch({
      type: TypeActions.MQTT_FILTER_DEVICES_NAME,
      data: e.target.value
    })
  }

  handleOnCheckedOnline = (e) => {
    Dispatcher.dispatch({
      type: TypeActions.CHECKED_ONLINE,
      data: e.target.checked
    })
  }

  handleOnCheckedOffline = (e) => {
    Dispatcher.dispatch({
      type: TypeActions.CHECKED_OFFLINE,
      data: e.target.checked
    })
  }

  handleOnDisconnect = (e) => {
    e.preventDefault()
    Dispatcher.dispatch({
      type: TypeActions.MQTT_DISCONNECT
    })
  }

  render () {
    return (
      <div className="col-12 col-md-12"
           style={{marginBottom: 20, display: this.props.connection ? 'block' : 'none'}}>
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
                    <button type='button' className='btn btn-danger' style={{width: '100%'}}
                            onClick={e => this.handleOnDisconnect(e)}>
                      <i className='fa fa-close'/>&nbsp;
                      Disconnect
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