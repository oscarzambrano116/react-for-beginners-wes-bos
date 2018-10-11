import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
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
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={'Fresh Seafood Market'}/>
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
