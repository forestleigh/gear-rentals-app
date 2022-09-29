import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// need this when you use functional components in react
import props from 'prop-types';

// Custom hook for handling input boxes
// saves us from creating onChange handlers for them individually
const useInput = init => { //this utilizes a react hook (use state) to simplify form handling
  const [ value, setValue ] = useState(init); //similar to setState but works with functional components instead of class components
  const onChange = e => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};

const ItemCreator = props => {
  const [ itemName, itemNameOnChange ] = useInput('');
  const [ itemDescription, itemDescriptionOnChange ] = useInput('');
  const [ numberAvailable, numberAvailableOnChange ] = useInput('');

  const saveItem = () => {
    // check if itemName is empty
    if (itemName === '') {
      setItemNameError('required');
    // check if itemDescription is empty
    } else if (itemDescription === '') {
      setItemDescriptionError('required');
      // check if numberAvaialable is not a number or is negative
    } else if (isNaN(numberAvailable) || numberAvailable < 0) {
      setNumberAvailableError('must be a positive number');
    } else {
      const body = {
        itemName,
        itemDescription,
        numberAvailable,
      };
      fetch('/api/gear', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch(err => console.log('CreateGear fetch /gear: ERROR: ', err));
    }
  };

    return (
      <section className="formCard">
        <header >
          <h2>Add New Rental Gear</h2>
        </header>
        <article>
          <h3>Enter your gear details</h3>
          <div>
            <label >Item Name: </label>
            <input name="itemName" placeholder="Gear name" value={itemName} onChange={itemNameOnChange} />
          </div>
          <div>
            <label>Item Description: </label>
            <input name="itemDescription" placeholder="Gear description" value={itemDescription} onChange={itemDescriptionOnChange} />
          </div>
          <div>
            <label>Number Available: </label>
            <input name="numberAvailable" placeholder="how many donated?" value={numberAvailable} onChange={numberAvailableOnChange} />
          </div>
          <div className="createItemButtonContainer">
            <button type="button" className="createButton" onClick={saveItem}>Save</button>
          </div>
        </article>
      </section>
    );
  };

export default ItemCreator;
