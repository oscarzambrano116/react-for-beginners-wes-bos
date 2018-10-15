import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.shape,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    updatedFish: PropTypes.func,
    deleteFish: PropTypes.func,
  };

  render() {
    const {
      addFish,
      loadSampleFishes,
      fishes,
      updatedFish,
      deleteFish,
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
              deleteFish={deleteFish}
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
