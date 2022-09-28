import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ItemCard from './ItemCard.jsx';

class ItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedGear: false,
      gear: [],
    };
  }

  componentDidMount() {
    console.log('ItemContainer mounted');
    console.log('ItemContainer props before fetch', props);
    fetch('/gear') //GET is the default
      .then(res => res.json())
      .then((gear) => {
        console.log('gear from GET request on compoment did mount', gear);
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
        <h1>Loading data, please wait...</h1>
      </div>
    );

    const { gear } = this.state;
    if (!gear) return null;
    if (!gear.length) return (
      <div>Sorry, no rental items found</div>
    );

    const gearElems = gear.map((item, i) => {
      return (
        <ItemCard key={i} info={item} />
      );
    });

    return (
      <section>
        <header>
          <h2>Current Inventory</h2>
        </header>
        <div>
          {gearElems}
        </div>
        <div>
          <Link to={'/create'}>
            <button type="button"
              className="createButton"
            >Add New Gear
            </button>
          </Link>
        </div>
      </section>
    );
  } //end of render

} //end of component

export default ItemContainer;