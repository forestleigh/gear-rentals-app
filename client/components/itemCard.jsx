import React from 'react';
// need this when you use functional components in react
import props from 'prop-types';

const ItemCard = ({
  info, 
  handleDelete,
  handleRent,
  handleReturn,
}) => {
  const { itemName, itemDescription, numberAvailable, _id } = info;
  // console.log('ItemCard info from props', info);

  return (
    <article>
      <div className='itemCard'>
        <h3>{itemName}</h3>
        <ul>
          <li>Item Description: {itemDescription} </li>
          <li>Number Available: {numberAvailable}</li>
        </ul>
        <div className="rentalButtonContainer">
          <button type="button" className="rentButton" onClick={(e) => handleRent( _id, numberAvailable, e )} >Rent</button>
          <button type="button" className="returnButton" onClick={(e) => handleReturn( _id, numberAvailable, e )} >Return</button>
          <button type="button" className="deleteButton" onClick={(e) => handleDelete( _id, e )} >delete</button>
        </div>
      </div>
    </article>
  );
};

export default ItemCard;
