import React from 'react'

export default () => (
  <div className="form-group">
    <div className="card">
      <div className="card-body">
        <div className="form-group">
          <h3>Publish</h3>
        </div>

        <div className="form-group">
          Topic
          <input type="text" className='form-control' disabled/>
        </div>

        <div className="form-group">
          Message
          <textarea cols="30" rows="5" className='form-control' disabled/>
        </div>

        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" disabled/>
            <label className="form-check-label">
              Retain
            </label>
            <button type='button' className='btn btn-success float-right' disabled>
              <i className='fa fa-paper-plane-o'/> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)