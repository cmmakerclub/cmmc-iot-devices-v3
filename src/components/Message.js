import React, { Component } from 'react'
import TypeActions from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'

export default class Message extends Component {

  constructor (props) {
    super(props)
  }

  handleOnClickClearRetain = (e) => {
    e.preventDefault()
    // console.log('handleOnClickClearRetain : ', this.props.data.destinationName)
    Dispatcher.dispatch({
      type: TypeActions.MQTT_CLEAR_RETAIN,
      data: this.props.data.destinationName
    })
  }

  render () {
    let data = this.props.data
    return (
      <div className="form-group">
        <div className="card">
          <div className="card-body">
            <small className='text-primary'>
              {data.timestamp}&ensp;&ensp;
              Topic:{data.destinationName}&ensp;&ensp;
              Qos:{data.qos}&ensp;&ensp;
              Retain: {data.retained ? 'true' : 'false'}
            </small>
            <button type='button' onClick={this.handleOnClickClearRetain} className='btn btn-danger float-right'
                    style={{display: !data.retained && 'none'}}><i
              className='fa fa-remove'/> Retain
            </button>
            <br/>
            <br/>
            {data.payloadString}
          </div>
        </div>
      </div>
    )
  }

}
