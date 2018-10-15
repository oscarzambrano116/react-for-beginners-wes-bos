import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFunName } from '../helpers';

class StorePicker extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  setInputRef = (element) => {
    this.myInput = element;
  }

  goToStore = (event) => {
    event.preventDefault();

    const {
      history: {
        push,
      },
    } = this.props;

    const storeName = this.myInput.value;
    push(`/store/${storeName}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type="text"
          placeholder={'Store Name'}
          defaultValue={getFunName()}
          required
          ref={this.setInputRef}
        />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;
