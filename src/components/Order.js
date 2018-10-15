import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };

    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500}}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => removeFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
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
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
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
