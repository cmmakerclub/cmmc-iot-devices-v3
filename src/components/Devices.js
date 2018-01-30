import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from '../flux/Store'
import uuid from 'uuid'
import Modal from 'react-modal'
import { initWeightTable } from './Weight.config'

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
        let storeData = store.state.messageArrived
        let listDevices = []
        let stateDevices = this.state.devices

        Object.keys(storeData).forEach((myName, idx) => {
          if (stateDevices[idx] !== undefined) {
            if (storeData[myName].d.timestamp > stateDevices[idx].d.timestamp) {
              storeData[myName].classUpdate = 'text-danger'

              if (this.state.currentDevice === myName) {

                initWeightTable(storeData[myName].info, storeData[myName].d)

                let tableInfoContent = []
                let tableDataContent = []

                Object.keys(storeData[myName].info).forEach((key) => {
                  tableInfoContent.push(
                    <tr key={uuid()}>
                      <td>{key}</td>
                      <td>{storeData[myName].info[key]}</td>
                    </tr>
                  )
                })

                Object.keys(storeData[myName].d).forEach((key) => {
                  tableDataContent.push(
                    <tr key={uuid()}>
                      <td>{key}</td>
                      <td>{storeData[myName].d[key]}</td>
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
          listDevices.push(storeData[myName])
        })

        this.setState({
          devices: listDevices
        })
      } else {

        this.setState({
          devices: []
        })

        ReactDOM.render(<div></div>, document.getElementById('myDevices'))
      }

    })

    Modal.setAppElement('#root')
  }

  componentWillMount () {
    setInterval(() => {
      this.state.devices.map((device, idx) => {
        let d = this.state.devices
        d[idx].classUpdate = 'text-primary'
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
              <div className="card-header bg-success">
                <span style={{color: 'white'}}>{d.myName}</span>
              </div>
              <div className="card-body text-primary">
                <p>ip : {info.ip}</p>
                <p>heap : {d.heap}</p>
                <p>run time : {((d.millis / 60000) / 60).toFixed(2)} hour</p>
                <p>millis : {d.millis}</p>
                <p>prefix : {info.prefix}</p>
                <p className={props.data.classUpdate}>
                  <i className='fa fa-clock-o'/>&ensp;
                  {moment(d.timestamp).fromNow()}
                </p>
                <button className='btn btn-primary' style={{width: '100%'}}
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

                  <button className='btn btn-danger float-right' onClick={this.closeModal}>Close</button>
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