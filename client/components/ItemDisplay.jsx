import React from 'react';
import Item from './Item.jsx';


const ItemDisplay = props => (
  <div className="itemDisplay">
    {props.items.map(item => (
      <Item
        key={item.id}
        itemName={itemName}
        itemDescription={itemDescription}
        numberAvailable={numberAvailable}
        rentItem={props.rentItem}
        returnItem={props.returnItem}
        editItem={props.returnItem}
      />
    ))}
  </div>
);

export default ItemDisplay;