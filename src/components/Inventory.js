import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends Component {
  render() {
    const {
      addFish,
      loadSampleFishes,
      fishes,
      updatedFish,
    } = this.props;

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {
          Object.keys(fishes).map((key) => (
            <EditFishForm
              key={key}
              index={key}
              fish={fishes[key]}
              updatedFish={updatedFish}
            />
          ))
        }
        <AddFishForm addFish={addFish} />
        <button onClick={loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;
