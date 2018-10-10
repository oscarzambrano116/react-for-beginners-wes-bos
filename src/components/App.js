import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

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

  render() {
    console.log('---this.state.fishes----');
    console.log(this.state.fishes);
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={'Fresh Seafood Market'}/>
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
