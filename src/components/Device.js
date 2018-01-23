import React, { Component } from 'react'
import TypeActions from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'
import Modal from 'react-modal'
import uuid from 'uuid'
import _ from 'underscore'

let moment = require('moment-timezone')
moment.locale('th')

export default class Message extends Component {

  constructor (props) {
    super(props)
    this.state = {
      devices: props.data,
      effectUpdate: 'red',
      modalIsOpen: false,
      tableContent: []
    }
    this.convertStringToJSON = JSON.parse(this.props.data.payloadString)
    Modal.setAppElement('#root')
  }

  effectUpdate = () => {
    setTimeout(() => {
      this.setState({effectUpdate: 'black'})
    }, 1000)
  }

  componentDidMount () {
    this.effectUpdate()
  }

  openModal = () => {
    this.setState({modalIsOpen: true})
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  handleClickInfo = (e) => {
    e.preventDefault()
    let tableContent = []

    tableContent.push(
      <tr>
        <td>myName</td>
        <td>{this.convertStringToJSON.d.myName}</td>
      </tr>
    )

    this.setState({tableContent: tableContent})
    this.openModal()
  }

  render () {
    let d = this.convertStringToJSON.d
    let info = this.convertStringToJSON.info

    const styles = {
      content: {marginBottom: 5},
      footer: {marginBottom: 0},
      customStyle: {
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px'

        }
      }
    }

    return (
      <div className="col-3">
        <div className="form-group">
          <div className="card">
            <div className="card-header bg-success">
              <span style={{color: 'white'}}>{d.myName}</span>
            </div>
            <div className="card-body text-primary">
              <p>ip : {info.ip}</p>
              <p>heap : {d.heap}</p>
              <p>run time : {((d.millis / 60000) / 60).toFixed(2)} hour</p>
              <p>millis : {d.millis}</p>
              <p>prefix : {info.prefix}</p>
              <p style={{color: this.state.effectUpdate}}>
                <i className='fa fa-clock-o'/>&ensp;
                {moment(this.props.data.unix).fromNow()}
              </p>
              <button className='btn btn-primary' style={{width: '100%'}} onClick={this.handleClickInfo}>
                MORE INFO
              </button>
              <Modal
                isOpen={this.state.modalIsOpen}
                style={styles.customStyle}
                contentLabel="Modal"
              >
                <table className='table table-bordered'>
                  <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                    {/*<th>Data Key</th>*/}
                    {/*<th>Value</th>*/}
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tableContent.map(d => d)}
                  </tbody>
                </table>
                <button className='btn btn-danger float-right' onClick={this.closeModal}>Close</button>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
