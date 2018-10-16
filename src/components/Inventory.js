import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    updatedFish: PropTypes.func,
    deleteFish: PropTypes.func,
    storeId: PropTypes.string,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    // 1. Look up the current store in the firebase database
    const { storeId } = this.props;
    const store = await base.fetch(storeId, {
      context: this,
    });

    // 2. claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${storeId}/owner`, {
        data: authData.user.uid,
      });
    }

    // 3. Set the state of the inventory component to refect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null,
    });
  }

  render() {
    const {
      state: {
        uid,
        owner,
      },
      props: {
        addFish,
        loadSampleFishes,
        fishes,
        updatedFish,
        deleteFish,
      }
    } = this;

    const logout = (
      <button onClick={this.logout}>Log Out!</button>
    );

    // 1. check if they are logged in
    if (!uid) {
      return (
        <Login
          authenticate={this.authenticate}
        />
      );
    }

    // 2. check if they are not the owner of the store
    if (uid !== owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }

    // 3. they must be the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
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
