import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    index: PropTypes.string,
    updatedFish: PropTypes.func.isRequired,
  };

  handleChange = (event) => {
    const {
      currentTarget: {
        name,
        value,
      },
    } = event;

    const {
      updatedFish,
      index,
    } = this.props;

    const updatedFishData = {
      ...this.props.fish,
      [name]: value,
    };

    updatedFish(index, updatedFishData);
  }

  handleDeleteFish = () => {
    const {
      deleteFish,
      index,
    } = this.props;

    deleteFish(index);
  }

  render() {
    const {
      fish: {
        name,
        price,
        status,
        desc,
        image,
      },
    } = this.props;

    return(
      <div className="fish-edit">
        <input type="text" name="name" onChange={this.handleChange} value={name} />
        <input type="text" name="price" onChange={this.handleChange} value={price} />
        <select type="text" name="status" onChange={this.handleChange} value={status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" onChange={this.handleChange} value={desc}/>
        <input type="text" name="image" onChange={this.handleChange} value={image} />
        <button onClick={this.handleDeleteFish}>Remove Fish</button>
      </div>
    );
  }
}

export default EditFishForm;
