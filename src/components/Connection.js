import React, { Component } from 'react'
import TypeActions from '../redux/constants'
import { MQTT_Connect } from '../mqtt.init'
import classNames from 'classnames'

export default class Connection extends Component {

  constructor (props) {
    super(props)
    this.state = {
      mqtt: {
        host: 'mqtt.cmmc.io',
        port: 9001,
        clientId: 'CMMC_' + Math.random().toString(16).substr(2, 8),
        username: '',
        password: '',
        topic: 'CMMC/#'
      },
      connection: false
    }

    this.store = this.props.store
    this.getState = this.props.store.getState()

    this.store.subscribe(() => {
      if (this.getState.connection && this.state.connection === false) {
        // console.log('set state connection')
        this.setState({connection: this.getState.connection})
      }
    })
  }

  componentWillUnmount () {
    console.log('Connection willUnmount')
  }

  handleOnConnect = () => {
    this.store.dispatch({
      type: TypeActions.MQTT_CONFIG,
      data: this.state.mqtt
    })
    //console.log('before ', this.state.mqtt)
    MQTT_Connect(this.state.mqtt)
  }

  onChangeHost = (e) => {
    let host = Object.assign({}, this.state.mqtt, {host: e.target.value})
    this.setState({mqtt: host})
  }

  onChangeUsername = (e) => {
    let username = Object.assign({}, this.state.mqtt, {username: e.target.value})
    this.setState({mqtt: username})
  }

  onChangePassword = (e) => {
    let password = Object.assign({}, this.state.mqtt, {password: e.target.value})
    this.setState({mqtt: password})
  }

  onChangeTopic = (e) => {
    let topic = Object.assign({}, this.state.mqtt, {topic: e.target.value})
    this.setState({mqtt: topic})
  }

  render () {

    let classConnectionSuccess = classNames({
      none: this.state.connection === true,
      block: this.state.connection === false
    })

    let classWaitingConnection = classNames({
      'col-12 col-md-3': this.state.connection === false
    })

    return (
      <div className={classWaitingConnection} style={{display: classConnectionSuccess}}>
        <div className="form-group">
          <div className="card">
            <div className="card-body">
              <form>
                <h6 className='text-right' style={{color: '#2c6cf0'}}>
                  Waiting for connection&ensp;
                  <i className='fa fa-circle text-danger'/>
                </h6>

                <div className="form-group">
                  Host
                  <input type="text" className='form-control' defaultValue={this.state.mqtt.host}
                         onChange={e => this.onChangeHost(e)}/>
                </div>
                <div className="form-group">
                  Port
                  <input type="text" className='form-control' defaultValue={9001}
                         onChange={e => this.setState({port: e.target.value})}/>
                </div>
                <div className="form-group">
                  ClientID
                  <input type="text" className='form-control' defaultValue={this.state.mqtt.clientId}
                  />
                </div>
                <div className="form-group">
                  Username
                  <input type="text" className='form-control'
                         onChange={e => this.onChangeUsername(e)}
                         autoComplete="current-username"/>
                </div>
                <div className="form-group">
                  Password
                  <input type="password" className='form-control'
                         onChange={e => this.onChangePassword(e)}
                         autoComplete="current-password"/>
                </div>
                <div className="form-group">
                  Topic
                  <input type="text" className='form-control' defaultValue={this.state.mqtt.topic}
                         onChange={e => this.onChangeTopic(e)}/>
                </div>
                <div className="form-group" style={{display: classConnectionSuccess}}>
                  <button type='button' className='btn btn-success' style={{width: '100%'}}
                          onClick={this.handleOnConnect}>
                    <i className='fa fa-globe'/> Connect
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
