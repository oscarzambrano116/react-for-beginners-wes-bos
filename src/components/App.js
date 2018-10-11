import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import sampleFishes from '../sample-fishes';

class App extends Component {
  state = {
    fishes: [],
    orders: [],
  };

  addFish = (fish) => {
    this.setState((prevState) => ({
      fishes: [...prevState.fishes, fish],
    }));
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  }

  render() {
    const {
      fishes,
    } = this.state;

    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={'Fresh Seafood Market'}/>
          <ul className="fishes">
            {
              fishes.map((item) => (
                <Fish
                  key={item.id}
                  {...item}
                />
              ))
            }
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
