import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/umd/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
import './App.css'

ReactDOM.render(<App store={store} />, document.getElementById('root'));
