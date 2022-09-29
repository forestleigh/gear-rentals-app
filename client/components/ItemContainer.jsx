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
    // this.updateItem = this.updateItem.bind(this);
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
        
        />
      );
    });

    return (
      <section>
        <header className="inventory">
          <h2 className="inventoryTitle">Current Inventory</h2>
        </header>
        <div className="cardsHolder">
          {gearElems}
        </div>
        <div>
          <Link to="/create">Add New Gear Item</Link>
        </div>
      </section>
    );
  } //end of render

} //end of component

export default ItemContainer;