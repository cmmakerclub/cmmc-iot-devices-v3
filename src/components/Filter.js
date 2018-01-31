import React, { Component } from 'react'
import TypeActions from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'

export default class Filter extends Component {

  constructor (props) {
    super(props)
  }

  handleOnChangeTextFilter = (e) => {
    e.preventDefault()
    Dispatcher.dispatch({
      type: TypeActions.MQTT_FILTER_DEVICES_NAME,
      data: e.target.value
    })
  }

  render () {
    return (
      <div className="col-12 col-md-9 offset-md-3"
           style={{marginBottom: 20, display: this.props.connection ? 'block' : 'none'}}>
        <div className="from-group">
          <div className="card">
            <div className="card-body">

              <div className="row">
                <div className="col-12 col-md-9">
                  <input type="text" className='form-control' placeholder='Filter device by name ...'
                         onChange={this.handleOnChangeTextFilter}/>
                </div>
                <div className="col-12 col-md-3 text-right col-form-label">

                  <div className="form-check form-check-inline">
                    <input type="checkbox" className="form-check-input"/>
                    <label className="form-check-label text-success">Online</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input type="checkbox" className="form-check-input"/>
                    <label className="form-check-label text-secondary">Offline</label>
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