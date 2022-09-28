import React from 'react';

const ItemCard = ({info}) => {
  const { itemName, itemDescription, numberAvailable } = info;

  return (
    <article>
      <div>
        <h3>{itemName}</h3>
      </div>
      <ul>
        <li>Item Description: {itemDescription} </li>
        <li>Number Available: {numberAvailable}</li>
      </ul>
    </article>
  );
};

export default ItemCard;
