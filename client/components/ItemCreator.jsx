import React from 'react';

const ItemCreator = ({
    itemName,
    itemDescription,
    numberAvailable,
}) => (
  <div>
    <form onSubmit={addMarket}>
      <input type=" text" id="itemName" value={itemName} />
      <input type=" text" id="itemDescription" value={itemDescription} />
      <input type=" text" id="numberAvailable" value={numberAvailable} />
      <button id='createButton' type="submit">Save New Item</button>
    </form>
  </div>
);

export default ItemCreator;
