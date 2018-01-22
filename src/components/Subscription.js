import React, { Component } from 'react'
import TypeActions from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'

export default class Subscription extends Component {

  constructor (props) {
    super(props)
    this.state = {
      topic: '#'
    }
  }

  handleOnSubscribe = (e) => {
    e.preventDefault()
    Dispatcher.dispatch({
      type: TypeActions.SUBSCRIBE,
      data: this.state.topic
    })
  }

  render () {
    return (
      <div className="row">
        <div className="col-9">
          <input type="text" className="form-control" onChange={e => this.setState({topic: e.target.value})}
                 placeholder="Topic"/>
        </div>
        <div className="col-3">
          <button type="submit" className="btn btn-primary mb-2" style={{width: '100%'}} onClick={e => this.handleOnSubscribe(e)}>
            <i className='fa fa-headphones'/>&nbsp;
            Subscribe
          </button>
        </div>
      </div>
    )
  }
}