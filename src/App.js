import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Connection from './components/Connection.js'
import Device from './components/Device'
import store from './flux/Store'
import uuid from 'uuid'
import _ from 'underscore'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      connection: false
    }

    store.addListener(() => {
      let sortByUNIX = store.state.messageArrived.sort((a, b) => {
        return b.unix - a.unix
      })

      let filterDeviceByName = _.uniq(sortByUNIX, data => {
        let convertStringToJSON = JSON.parse(data.payloadString)
        return convertStringToJSON.d.myName
      })

      this.setState({
        messages: filterDeviceByName,
        connection: store.state.connection
      })
    })
  }

  render () {
    return (
      <div className="container">
        <Navbar/>
        <div className="row">
          <div className="col-3" style={{marginTop: 20, display: this.state.connection && 'none'}}>
            <Connection/>
          </div>
          <div className={this.state.connection ? 'col-12' : 'col-9'} style={{marginTop: 20}}>

            <div className="form-group">
              <div className="form-group">
                <h3>Devices</h3>
              </div>
              <div className="row">
                {this.state.messages.map(object => <Device key={uuid()} data={object}/>)}
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default App
