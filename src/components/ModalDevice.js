import React, { Component } from 'react'
import Modal from 'react-modal'

const customStyles = {
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

export default class ModalDevice extends Component {
  constructor () {
    super()

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    Modal.setAppElement('#root')
  }

  openModal () {
    console.log('open click')
    this.setState({modalIsOpen: true})
  }

  afterOpenModal () {
    // references are now sync'd and can be accessed.
    console.log('do something after open modal')
  }

  closeModal () {
    console.log('close click')
    this.setState({modalIsOpen: false})
  }

  render () {
    return (
      <div>
        <button type='button' className='btn btn-primary' style={{width: '100%'}} onClick={this.openModal}>
          MORE INFO
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="form-group">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>DataKey</th>
                  <th>Value</th>
                  <th>InfoKey</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
          <div className="form-group float-right">
            <button type='button' className='btn btn-danger' onClick={this.closeModal}>close</button>
          </div>
        </Modal>
      </div>
    )
  }
}