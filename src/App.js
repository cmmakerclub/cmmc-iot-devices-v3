import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Connection from './components/Connection.js'
import store from './flux/Store'
import uuid from 'uuid'
import _ from 'underscore'
import logo from './assets/cmmc-logo.png'
import Devices from './components/Devices'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      connection: false
    }

    store.addListener(() => {
      let storeData = store.state.messageArrived
      let devices = []

      Object.keys(storeData).forEach((myName) => {
        devices.push(storeData[myName])
      })

      this.setState({
        messages: devices,
        connection: store.state.connection
      })
    })
  }

  render () {

    const hiddenWhenConnectingFail = !this.state.connection && 'none'
    const hiddenWhenConnectingSuccess = this.state.connection && 'none'

    return (
      <div className="container">
        {/*<Navbar/>*/}
        <div className="row">
          <div className="col-12" style={{marginTop: 20, display: hiddenWhenConnectingSuccess}}>
            <Connection/>
          </div>
          <div className='col-12' style={{marginTop: 20, display: hiddenWhenConnectingFail}}>
            <div className="form-group">

              <div className="row">
                <div className="col-2 text-center">
                  <img src={logo} style={{height: 30}} alt=""/>
                </div>
                <div className="col text-right">
                  <h3>
                    Connection <i className={this.state.connection && 'fa fa-circle text-success'}/>
                  </h3>
                </div>
              </div>

              <hr/>

              {/*<div className="form-group">*/}
                {/**/}
                {/*<h3>*/}
                  {/*<i className={this.state.connection && 'fa fa-circle text-success'}/>&ensp;*/}
                  {/*{this.state.connection && 'Devices'}*/}
                {/*</h3>*/}
              {/*</div>*/}

              <div className="row">
                <Devices/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
