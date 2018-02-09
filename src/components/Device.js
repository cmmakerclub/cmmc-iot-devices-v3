import React, { Component } from 'react'
import TimeUpdate from './TimeUpdate'

let moment = require('moment-timezone')
moment.locale('th')

window.checkMillisUpdate = 0

class Device extends Component {

  constructor (props) {
    super(props)
    this.data = this.props.data
    this.state = {
      classUpdate: 'text-primary'
    }
  }

  componentWillReceiveProps (nextProps) {
    window.checkMillisUpdate = nextProps.data.d.millis
  }

  shouldComponentUpdate (nextProps, nextState) {
    let shouldUpdate = false
    if (nextProps.data.d.millis > this.data.d.millis) {
      shouldUpdate = true
      this.data = {
        ...nextProps.data,
        ...{classCardHeader: 'card-header bg-success'}
      }
    }
    return shouldUpdate
  }

  render () {
    return (
      <div className="col-12 col-md-3">
        <div className="form-group">
          <div className="card">
            <div className={this.data.classCardHeader}>
              <span style={{color: 'white'}}>{this.data.d.myName}</span>
            </div>
            <div className="card-body text-primary">
              <p>ip : {this.data.info.ip}</p>
              <p>heap : {this.data.d.heap}</p>
              <p>run time : {moment(moment.now() - this.data.d.millis).fromNow()}</p>
              <p>millis : {this.data.d.millis}</p>
              <p>prefix : {this.data.info.prefix}</p>

              <TimeUpdate data={this.data}/>

              <button className='btn btn-primary' style={{width: '100%'}}>
                MORE INFO
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Device