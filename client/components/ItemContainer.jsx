import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
// need this when you use functional components in react
import props from 'prop-types';

import ItemCard from './ItemCard.jsx';
import ItemCreator from './ItemCreator.jsx';

class ItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedGear: false,
      gear: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRent = this.handleRent.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  componentDidMount() {
    console.log('ItemContainer mounted');
    // console.log('ItemContainer props before fetch', props);
    fetch('/api') //fetch data from server
      .then(res => res.json())
      .then((gear) => {
        // console.log('gear from GET request on compoment did mount', gear);
        if (!Array.isArray(gear)) gear = [];
        return this.setState({
          gear,
          fetchedGear: true
        });
      })
      .catch(err => console.log('Gear.componentDidMount: get gear: ERROR: ', err));
  }

  handleDelete(id, e) {
    e.preventDefault();
    console.log('handleDelete called');
    fetch(`/api/gear/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('res from DELETE request', res);
        if (res.status === 200) {
          const gear = this.state.gear.filter(item => item._id !== id);
          this.setState({ gear });
        }
      })
      .catch(err => console.log('ItemContainer.handleDelete: ERROR: ', err));
  }

  handleRent(id, numberAvailable, e) {
    e.preventDefault();
    console.log('handleRent called');
    fetch(`/api/gear/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ numberAvailable: numberAvailable - 1 }),
    })
      .then((res) => {
        console.log('res from PATCH request', res);
        if (res.status === 200) {
          const gear = this.state.gear.map((item) => {
            if (item._id === id) {
              item.numberAvailable -= 1;
            }
            return item;
          });
          this.setState({ gear });
        }
      })
      .catch(err => console.log('ItemContainer.handleRent: ERROR: ', err));
  }

  handleReturn(id, numberAvailable, e) {
    e.preventDefault();
    console.log('handleReturn called');
    fetch(`/api/gear/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ numberAvailable: numberAvailable + 1 }),
    })
      .then((res) => {
        console.log('res from PATCH request', res);
        if (res.status === 200) {
          const gear = this.state.gear.map((item) => {
            if (item._id === id) {
              item.numberAvailable += 1;
            }
            return item;
          });
          this.setState({ gear });
        }
      })
      .catch(err => console.log('ItemContainer.handleReturn: ERROR: ', err));
  }


  render() {
    if (!this.state.fetchedGear) return (
      <div>
        <p className='annoucements'>Loading data, please wait...</p>
      </div>
    );

    const { gear } = this.state;
    if (!gear) return null;
    if (!gear.length) return (
      <p className='annoucements'>Sorry, no rental items found</p>
    );

    const gearElems = gear.map((item, i) => {
      return (
        <ItemCard key={i} 
        info={item}
        handleDelete={this.handleDelete}
        handleRent={this.handleRent}
        handleReturn={this.handleReturn}
        />
      );
    });

    return (
      <div className='item-container'>
          <section>
            <header className="inventory">
              <h2 className="inventoryTitle">Current Inventory</h2>
            </header>
            <div className="cards-holder">
              {gearElems}
            </div>
            <div>
              <ItemCreator props={gear} />
            </div>
          </section>
      </div>
      
    );
  } //end of render

} //end of component

export default ItemContainer;