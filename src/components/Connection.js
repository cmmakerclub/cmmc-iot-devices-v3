import React, { Component } from 'react'
import Dispatcher from '../flux/Dispatcher'
import TypeActions from '../flux/Constants'
import store from '../flux/Store'
import './styles.css'

export default class Connection extends Component {

  constructor (props) {
    super(props)
    this.state = {
      host: 'mqtt.cmmc.io',
      port: 9001,
      clientId: 'CMMC_' + Math.random().toString(16).substr(2, 8),
      username: '',
      password: '',
      topic: 'CMMC/#',
      hiddenConnection: '',
      connection: false,
      disableField: false
    }

    store.addListener(() => {
      this.setState({
        connection: store.state.connection
      })
      store.state.connection ? this.setState({disableField: true}) : this.setState({disableField: false})
    })
  }

  handleOnConnect = (e) => {
    e.preventDefault()
    Dispatcher.dispatch({
      type: TypeActions.MQTT_CONNECT,
      data: this.state
    })
  }

  // handleOnDisconnect = (e) => {
  //   e.preventDefault()
  //   Dispatcher.dispatch({
  //     type: TypeActions.MQTT_DISCONNECT
  //   })
  // }

  render () {

    const hiddenWhenConnectingFail = !this.state.connection ? 'none' : 'block'
    const hiddenWhenConnectingSuccess = this.state.connection ? 'none' : 'block'

    return (
      <div className={hiddenWhenConnectingFail && 'col-12 col-md-3'} style={{display: hiddenWhenConnectingSuccess}}>
        <div className="form-group">
          <div className="card">
            <div className="card-body">
              <form>
                <h6 className='text-right' style={{color: '#2c6cf0'}}>
                  {this.state.connection ? 'Connection' : 'Waiting for connection'}&ensp;
                  <i className={this.state.connection ? 'fa fa-circle text-success' : 'fa fa-circle text-danger'}/>
                </h6>

                {/*<div className="form-group" style={{display: hiddenWhenConnectingFail}}>*/}
                  {/*<button type='button' className='btn btn-danger' style={{width: '100%'}}*/}
                          {/*onClick={e => this.handleOnDisconnect(e)}>Disconnect*/}
                  {/*</button>*/}
                {/*</div>*/}

                <div className={this.state.connection ? 'fadeOut' : 'fadeIn'}>

                  <div className="form-group">
                    Host
                    <input type="text" className='form-control' defaultValue={'mqtt.cmmc.io'}
                           onChange={e => this.setState({host: e.target.value})} disabled={this.state.disableField}/>
                  </div>
                  <div className="form-group">
                    Port
                    <input type="text" className='form-control' defaultValue={9001}
                           onChange={e => this.setState({port: e.target.value})} disabled={this.state.disableField}/>
                  </div>
                  <div className="form-group">
                    ClientID
                    <input type="text" className='form-control' defaultValue={this.state.clientId}
                           disabled={this.state.disableField}/>
                  </div>
                  <div className="form-group">
                    Username
                    <input type="text" className='form-control'
                           onChange={e => this.setState({username: e.target.value})}
                           disabled={this.state.disableField}
                           autoComplete="current-username"/>
                  </div>
                  <div className="form-group">
                    Password
                    <input type="password" className='form-control'
                           onChange={e => this.setState({password: e.target.value})}
                           disabled={this.state.disableField}
                           autoComplete="current-password"/>
                  </div>
                  <div className="form-group">
                    Topic
                    <input type="text" className='form-control' defaultValue={this.state.topic}
                           onChange={e => this.setState({topic: e.target.value})} disabled={this.state.disableField}/>
                  </div>
                  <div className="form-group" style={{display: hiddenWhenConnectingSuccess}}>
                    <button type='button' className='btn btn-success' style={{width: '100%'}}
                            onClick={e => this.handleOnConnect(e)}>
                      <i className='fa fa-globe'/> Connect
                    </button>
                  </div>

                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

}