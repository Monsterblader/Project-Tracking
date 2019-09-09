import React from 'react';
import Plus from '../Plus.js';
import './Additem.css';

function Additem(props) {
  return (
    <div className="add-item">
      <div
          style={{ display: "inline-block" }}
          onClick={ e => {
            props.activateAdditem(e.currentTarget.nextSibling.value);
            e.currentTarget.nextSibling.value = '';
          }}>
        <Plus />
      </div>
      <input
        type="text"
        className="text-box"
        placeholder="Another day, another task"
        style={{ width: '200px' }}
      />
    </div>
  )
}

export default Additem;
