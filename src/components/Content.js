import React, {Component} from 'react'
import loading from '../assets/loading-2.gif'
import Devices from './Devices'

export default class Content extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='col-12 col-md-9'>
        <div className="form-group">
          <div style={{display: this.props.hiddenDiv}} className='text-right'>
            Please wait a few minute&ensp;<img src={loading} style={{width: 30}} alt=""/>
          </div>
          <Devices/>
        </div>
      </div>
    )
  }

}