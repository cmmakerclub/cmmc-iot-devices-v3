import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// import uuid from 'uuid'
// import Modal from 'react-modal'
// import { initWeightTable } from './Weight.config'
// import { MQTT_Publish } from '../MQTT_INIT'
import Device from './Device'

export default class Devices extends Component {

  constructor (props) {
    super(props)
    this.store = this.props.store
    this.getState = this.props.store.getState()
    // this.updateTime = new Date()
  }


  // componentDidMount() {
  //   console.log('........... did Mount')
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.getState.arrayDevices)
  //   const shouldUpdate = (new Date() - this.updateTime) > 1000
  //   if (shouldUpdate) {
  //     this.updateTime = new Date()
  //   }
  //
  //   console.log(shouldUpdate)
  //   return shouldUpdate
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('component did update')
  //
  // }


  render () {

    return (
      <div id='myDevices' className='row'>
        {
          this.getState.arrayDevices.map(obj => {
            return (<Device key={obj.d.myName} data={obj}/>)
          })
        }
      </div>
    )
  }

}