import React, { Component } from 'react'

let moment = require('moment-timezone')
moment.locale('th')

class Device extends Component {

  constructor (props) {
    super (props)

    this.data = this.props.data

    // this.currentMillis = 0

    // store.subscribe(() => {
    //
    //   console.log('store change')
    //   console.log(store.getState())
    //
    // })

  }

  componentWillReceiveProps (nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = false

    if (this.data.d.millis !== nextProps.data.d.millis) {
      shouldUpdate = true
      this.data = nextProps.data
    }
    return shouldUpdate
  }

  componentDidMount () {
    console.log('componentDidMount : ', this.data.d.myName)
  }

  componentWillUnmount () {
    console.log('componentWillUnmount : ', this.data.d.myName)
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
              <p className={this.data.classUpdate}>
                <i className='fa fa-clock-o'/>&ensp;
                {moment(this.data.d.timestamp).fromNow()}
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

}

export default Device