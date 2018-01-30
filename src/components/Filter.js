import React, { Component } from 'react'

export default class Filter extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="col-12 col-md-9 offset-md-3"
           style={{marginBottom: 20, display: this.props.connection ? 'block' : 'none'}}>
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
    )
  }

}