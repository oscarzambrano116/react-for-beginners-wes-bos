import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Order extends Component {
  renderOrder = (key) => {
    const {
      fishes,
      orders,
      removeFromOrder,
    } = this.props;

    const fish = fishes[key];
    const count = orders[key];
    const isAvailable = fish && fish.status === 'available';
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available
        </li>
      )
    }

    return (
      <li key={key}>
        {`${count} lbs ${fish.name} ${formatPrice(count * fish.price)}`}
        <button onClick={() => removeFromOrder(key)}>&times;</button>
      </li>
    )
  }

  render() {
    const {
      orders,
      fishes,
    } = this.props;

    const orderIds = Object.keys(orders);

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key];
      const count = orders[key];
      const isAvailable = fish && fish.status === 'available';

      if (isAvailable) {
        return prevTotal + (count * fish.price);
      }

      return prevTotal;
    }, 0);

    return(
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
        </ul>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  orders: PropTypes.object,
};

export default Order;
