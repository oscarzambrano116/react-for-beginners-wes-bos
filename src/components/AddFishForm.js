import React, { Component } from 'react';

class AddFishForm extends Component {
  state = {
    name: '',
    price: '',
    status: '',
    desc: '',
    image: '',
  };

  formOnChange = (event) => {
    const {
      target: {
        name,
        value,
      },
    } = event;

    this.setState({
      [name]: value,
    });
  }

  createFish = (event) => {
    event.preventDefault();
    const {
      state,
      state: {
        price,
      },
      props: {
        addFish,
      }
    } = this;

    const fish = {
      ...state,
      price: parseFloat(price),
    };

    addFish(fish);
  }

  render() {
    const {
      name,
      price,
      status,
      desc,
      image,
    } = this.state;

    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" value={name} onChange={this.formOnChange} />
        <input name="price" type="text" placeholder="Price" value={price} onChange={this.formOnChange} />
        <select name="status" value={status} onChange={this.formOnChange}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea name="desc" placeholder="Desc" value={desc} onChange={this.formOnChange}></textarea>
        <input name="image" type="text" placeholder="Image" value={image} onChange={this.formOnChange} />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
