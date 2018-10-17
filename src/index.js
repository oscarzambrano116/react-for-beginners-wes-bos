import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import './css/style.css';

const app = document.querySelector('#main');
render(<Router />, app);
