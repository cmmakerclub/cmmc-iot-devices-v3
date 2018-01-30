import React, { Component } from 'react'
import Connection from './components/Connection.js'
import store from './flux/Store'
import loading from './assets/loading-2.gif'
import Devices from './components/Devices'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      connection: false,
      hiddenLoading: 'none'
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

      if (this.state.connection && this.state.messages.length === 0) {
        this.setState({hiddenLoading: 'block'})
      } else {
        this.setState({hiddenLoading: 'none'})
      }

    })
  }

  render () {
    return (
      <div className="container">
        <div className="row" style={{marginTop: 20}}>
          <div className="col-12 col-md-9 offset-md-3" style={{marginBottom: 20}}>
            <div className="from-group">
              <div className="card">
                <div className="card-body">

                  <div className="row">
                    <div className="col-12 col-md-10">
                      <input type="text" className='form-control' placeholder='Filter device by name ...'/>
                    </div>
                    <div className="col-12 col-md-2 text-right">
                      <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className='fa fa-filter'/>&nbsp;
                          Filter
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a className="dropdown-item" href="#">
                            <i className='fa fa-circle text-success'/>&ensp;
                            Online
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className='fa fa-circle text-secondary'/>&ensp;
                            Offline
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <Connection/>
          </div>
          <div className='col-12 col-md-9'>
            <div className="form-group">
              <div style={{display: this.state.hiddenLoading}} className='text-right'>
                Please wait a few minute&ensp;<img src={loading} style={{width: 30}} alt=""/>
              </div>
              <Devices/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
