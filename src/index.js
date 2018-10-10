import React, { Component } from 'react';
import { render } from 'react-dom';
import StorePicker from './components/StorePicker';
import App from './components/App';
import './css/style.css';

const app = document.querySelector('#main');
render(<App />, app);
