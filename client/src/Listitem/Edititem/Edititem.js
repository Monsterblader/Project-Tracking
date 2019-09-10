import React from 'react';
import Plus from "../../assets/Plus.js";
import './Edititem.css';

function Edititem(props) {
  return (
    <div className="edit-item">
      <div
          className="svg-container"
          onClick={ e => props.updateItem(e.currentTarget.nextSibling.value) }>
        <Plus />
      </div>
      <input
        className="text-box"
        value={ props.itemState.editedItem }
        onChange={ e => {
          e.keyCode === 13
            ? props.updateItem(e.currentTarget.value)
            : props.changeItem(e.currentTarget.value) }}
        onBlur={
          props.cancel
         }
      />
    </div>
  );
}

export default Edititem;
