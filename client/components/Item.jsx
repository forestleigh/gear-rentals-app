import React from 'react';
import LabeledText from './LabeledText.jsx';

const Item = ({
  itemName,
  itemDescription,
  numberAvailable,
  rentItem,
  returnItem,
  editItem,
}) => (
  <div className="itemRow">
    <LabeledText label="Item Name" text={itemName} />
    <LabeledText label="Item Description" text={itemDescription} />
    <LabeledText label="No. Available" text={numberAvailable} />
    <div className="flex">
      <button className='rentButton' onClick={rentItem}>Rent</button>
      <button className='returnButton' onClick={returnItem}>Return</button>
      <button className='editButton' onClick={editItem}>Edit</button>
    </div>
  </div>
);

export default Item;