import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from '../flux/Store'
import uuid from 'uuid'
import Modal from 'react-modal'
import { initWeightTable } from './Weight.config'
import TypeActions from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'

let moment = require('moment-timezone')
moment.locale('th')

export default class Devices extends Component {

  constructor (props) {
    super(props)

    this.state = {
      devices: [],
      modalIsOpen: false,
      tableInfoContent: [],
      tableDataContent: [],
      currentDevice: '',
      tableHeaderFirst: [
        <tr key={uuid()}>
          <th>DataKey</th>
          <th>Value</th>
        </tr>
      ],
      tableHeaderSecond: [
        <tr key={uuid()}>
          <th>InfoKey</th>
          <th>Value</th>
        </tr>
      ]
    }

    store.addListener(() => {

      if (store.state.connection) {
        this.storeData = store.state.messageArrived
        this.storeFilterDevices = store.state.filterDevices
        this.listDevices = []
        this.stateDevices = this.state.devices

        let checkedOnline = store.state.checkedOnline
        let checkedOffline = store.state.checkedOffline

        if (checkedOnline === false && checkedOffline === false) {
          if (this.storeFilterDevices.length === 0) {
            this.renderDevices(this.storeData)
          } else {
            this.renderDevices(this.storeFilterDevices)
          }
        } else {
          if (checkedOffline) {
            this.renderDevices(store.state.devicesOffline)
          }
          if (checkedOnline) {
            this.renderDevices(store.state.devicesOnline)
          }
        }

      } else {

        this.setState({
          devices: []
        })

        ReactDOM.render(<div></div>, document.getElementById('myDevices'))
      }

    })

    Modal.setAppElement('#root')
  }

  renderDevices = (store) => {
    Object.keys(store).forEach((myName, idx) => {
      if (this.stateDevices[idx] !== undefined) {
        if (store[myName].d.timestamp > this.stateDevices[idx].d.timestamp) {

          store[myName].classUpdate = 'text-danger'
          store[myName].classCardHeader = 'card-header bg-success'

          if (this.state.currentDevice === myName) {

            initWeightTable(store[myName].info, store[myName].d)

            let tableInfoContent = []
            let tableDataContent = []

            Object.keys(store[myName].info).forEach((key) => {
              tableInfoContent.push(
                <tr key={uuid()}>
                  <td>{key}</td>
                  <td>{store[myName].info[key]}</td>
                </tr>
              )
            })

            Object.keys(store[myName].d).forEach((key) => {
              tableDataContent.push(
                <tr key={uuid()}>
                  <td>{key}</td>
                  <td>{store[myName].d[key]}</td>
                </tr>
              )
            })

            this.setState({
              tableInfoContent: tableInfoContent,
              tableDataContent: tableDataContent
            })

          }

        }
      }
      this.listDevices.push(store[myName])
    })
    this.setState({devices: this.listDevices})
  }

  componentWillMount () {
    setInterval(() => {
      this.state.devices.forEach((device, idx) => {
        let d = this.state.devices
        d[idx].classUpdate = 'text-primary'

        let diff = moment.now() - d[idx].d.timestamp
        if (diff > (60000)) {
          d[idx].classCardHeader = 'card-header bg-secondary'
          Dispatcher.dispatch({
            type: TypeActions.DEVICES_OFFLINE,
            data: d[idx]
          })
        }

        this.setState({devices: d})
      })
      // console.log(this.state.devices)
    }, 1000)
  }

  openModal = () => {
    this.setState({modalIsOpen: true})
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  handleClickInfo = (e, info, d) => {
    e.preventDefault()

    this.setState({weightTable: initWeightTable(info, d)})

    let tableInfoContent = []
    let tableDataContent = []

    Object.keys(info).forEach((key) => {
      tableInfoContent.push(
        <tr key={uuid()}>
          <td>{key}</td>
          <td>{info[key]}</td>
        </tr>
      )
    })

    Object.keys(d).forEach((key) => {
      tableDataContent.push(
        <tr key={uuid()}>
          <td>{key}</td>
          <td>{d[key]}</td>
        </tr>
      )
    })

    let resultWeight = initWeightTable(info, d)

    if (resultWeight) {
      this.setState({
        tableHeaderFirst: [resultWeight[0]],
        tableHeaderSecond: [resultWeight[1]]
      })
    }

    this.setState({
      tableInfoContent: tableInfoContent,
      tableDataContent: tableDataContent,
      currentDevice: d.myName
    })

    this.openModal()
  }

  render () {

    const Component = (props) => {

      let d = props.data.d
      let info = props.data.info

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
        <div className="col-12 col-md-4">
          <div className="form-group">
            <div className="card">
              <div className={props.data.classCardHeader}>
                <span style={{color: 'white'}}>{d.myName}</span>
              </div>
              <div className="card-body text-primary">
                <p>ip : {info.ip}</p>
                <p>heap : {d.heap}</p>
                <p>run time : {moment(moment.now() - d.millis).fromNow()}</p>
                <p>millis : {d.millis}</p>
                <p>prefix : {info.prefix}</p>
                <p className={props.data.classUpdate}>
                  <i className='fa fa-clock-o'/>&ensp;
                  {moment(d.timestamp).fromNow()}
                </p>
                <button className='btn' style={{width: '100%', backgroundColor: '#0D86D9', color: 'white'}}
                        onClick={(e) => this.handleClickInfo(e, info, d)}>
                  MORE INFO
                </button>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  style={styles.customStyle}
                  contentLabel="Modal"
                >
                  <div className='row'>
                    <div className="col-12 col-md-6 text-center">
                      <table className='table table-bordered'>
                        <thead>
                        {this.state.tableHeaderFirst.map(header => header)}
                        </thead>
                        <tbody>
                        {this.state.tableInfoContent.map(d => d)}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                      <table className='table table-bordered'>
                        <thead>
                        {this.state.tableHeaderSecond.map(header => header)}
                        </thead>
                        <tbody>
                        {this.state.tableDataContent.map(d => d)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <button type='button' className='btn btn-danger float-right' onClick={this.closeModal}>Close</button>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div id='myDevices' className='row'>
        {this.state.devices.map(obj => <Component key={uuid()} data={obj}/>)}
      </div>
    )
  }

}