import React, { Component } from 'react';
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

  componentDidMount() {
    const {
      match: {
        params: {
          storeId,
        },
      },
    } = this.props;

    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({ fishes });
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
        />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
