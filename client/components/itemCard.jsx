import React from 'react';
// need this when you use functional components in react
import props from 'prop-types';

const ItemCard = ({info}) => {
  const { itemName, itemDescription, numberAvailable, _id } = info;
  // console.log('ItemCard info from props', info);

  const rentItem = () => {
    console.log('rentItem clicked');

    const body = { 
      ...info, 
      numberAvailable: numberAvailable - 1,
    };
    console.log('body before fetch', body);

      fetch('/api/gear', {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then((data) => {
          console.log(data);
        })
        .then(() => {
          props.history.push('/');
        })
        .catch(err => console.log('CreateGear fetch /gear: ERROR: ', err));
    }

  return (
    <article>
      <div className='itemCard'>
        <h3>{itemName}</h3>
        <ul>
          <li>Item Description: {itemDescription} </li>
          <li>Number Available: {numberAvailable}</li>
        </ul>
        <div className="rentalButtonContainer">
          <button type="button" className="returnButton" >Return</button>
          <button type="button" className="rentButton" onClick={()=>props.rentItem()} >Rent</button>
        </div>
      </div>
    </article>
  );
};

export default ItemCard;
