import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import base from '../base';

import sampleFishes from '../sample-fishes';

class App extends Component {
  state = {
    fishes: {},
    orders: {},
  };

  static propTypes = {
    match: PropTypes.object,
  }

  componentDidMount() {
    const {
      match: {
        params: {
          storeId,
        },
      },
    } = this.props;

    const localStorageRef = localStorage.getItem(storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }

    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    const {
      state: {
        orders,
      },
      props: {
        match: {
          params: {
            storeId,
          },
        },
      }
    } = this;

    localStorage.setItem(storeId, JSON.stringify(orders));
  }

  addFish = (fish) => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({ fishes });
  }

  updatedFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  }

  removeFromOrder = (key) => {
    const orders = { ...this.state.orders };
    delete orders[key];
    this.setState({ orders });
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  }

  addToOrder = (key) => {
    const orders = { ...this.state.orders };
    orders[key] = orders[key] + 1 || 1;
    this.setState({ orders });
  }

  render() {
    const {
      fishes,
      orders,
    } = this.state;

    const {
      match: {
        params: {
          storeId,
        },
      },
    } = this.props;

    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={'Fresh Seafood Market'}/>
          <ul className="fishes">
            {
              Object.keys(fishes).map((key) => (
                <Fish
                  key={key}
                  index={key}
                  {...fishes[key]}
                  addToOrder={this.addToOrder}
                />
              ))
            }
          </ul>
        </div>
        <Order
          orders={orders}
          fishes={fishes}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updatedFish={this.updatedFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={fishes}
          storeId={storeId}
        />
      </div>
    );
  }
}

export default App;
