import React from 'react';
import Plus from "../../Plus.js";
import './Edititem.css';

function Edititem(props) {
  return (
    <div className="edit-item">
      <div
          style={{ display: "inline-block" }}
          onClick={ e => props.updateItem(e.currentTarget.nextSibling.value) }>
        <Plus />
      </div>
      <input
        className="text-box"
        value={ props.itemState.editedItem }
        onChange={ e => props.changeItem(e.currentTarget.value) }
      />
    </div>
  );
}

export default Edititem;
