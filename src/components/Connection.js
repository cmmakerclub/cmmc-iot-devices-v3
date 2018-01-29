import React, { Component } from 'react'
import Dispatcher from '../flux/Dispatcher'
import TypeActions from '../flux/Constants'
import logo from '../assets/cmmc-logo.png'

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
      hiddenConnection: ''
    }
  }

  handleOnConnect = (e) => {
    e.preventDefault()
    Dispatcher.dispatch({
      type: TypeActions.CONNECTING,
      data: this.state
    })
  }

  render () {
    return (
      <div className="row">
        <div className="col-12 col-md-4 offset-md-4">
          <div className="form-group">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <img src={logo} style={{height: 30}} alt=""/>
                  </div>
                  <h4 className='text-right' style={{color: '#2c6cf0'}}>
                    {/*Connection <i className='fa fa-circle text-danger float-right'/>*/}
                    MQTT Connection
                  </h4>
                  <div className="form-group">
                    Host
                    <input type="text" className='form-control' defaultValue={'mqtt.cmmc.io'}
                           onChange={e => this.setState({host: e.target.value})}/>
                  </div>
                  <div className="form-group">
                    Port
                    <input type="text" className='form-control' defaultValue={9001}
                           onChange={e => this.setState({port: e.target.value})}/>
                  </div>
                  <div className="form-group">
                    ClientID
                    <input type="text" className='form-control' defaultValue={this.state.clientId}/>
                  </div>
                  <div className="form-group">
                    Username
                    <input type="text" className='form-control' onChange={e => this.setState({username: e.target.value})}/>
                  </div>
                  <div className="form-group">
                    Password
                    <input type="password" className='form-control'
                           onChange={e => this.setState({password: e.target.value})}/>
                  </div>
                  <div className="form-group">
                    Topic
                    <input type="text" className='form-control' defaultValue={this.state.topic}
                           onChange={e => this.setState({topic: e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <button type='button' className='btn btn-success' style={{width: '100%'}}
                            onClick={e => this.handleOnConnect(e)}>
                      <i className='fa fa-globe'/> Connect
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}