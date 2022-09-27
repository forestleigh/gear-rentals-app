import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import ItemCreator from './ItemCreator.jsx';

const ItemContainer = props => (
  <div className="container">
    <div className="outerBox">
      <h1 id="header">Surf Club Inventory</h1>
      <ItemDisplay {...props} />
      <ItemCreator />
    </div>
  </div>
);

export default ItemContainer;