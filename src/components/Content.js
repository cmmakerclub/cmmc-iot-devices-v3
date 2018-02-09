import React, { Component } from 'react'
import loading from '../assets/loading-2.gif'
import Device from './Device'
// import { initWeightTable } from './Weight.config'

export default class Content extends Component {

  constructor (props) {
    super(props)
    this.store = this.props.store
    this.getState = this.store.getState()
  }

  render () {
    return (
      <div className='col-12 col-md-12'>
        <div className="form-group">
          <div style={{display: this.props.hiddenDiv}} className='text-right'>
            Please wait a few minute&ensp;<img src={loading} style={{width: 30}} alt=""/>
          </div>
          <div className='row'>
            {
              this.getState.arrayDevices.map(deviceData => {
                return (<Device key={deviceData.d.myName} data={deviceData}/>)
              })
            }
          </div>
        </div>
      </div>
    )
  }

}