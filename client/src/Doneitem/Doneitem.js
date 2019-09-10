import React from 'react';
import Checkmark from '../assets/Checkmark.js';
import Xmark from '../assets/Xmark.js';
import './Doneitem.css';

function Doneitem(props) {
  return (
    <div className="done-item">
      <div
          className="svg-container"
          onClick={ () => {
            console.log('clicked');
            props.uncompleteItem();
          } }>
        <svg
            height="30.0"
            transform="scale(-1,1) translate(0,5)"
            width="30.0">
          <Checkmark />
        </svg>
      </div>
      <div
          className="svg-container"
          onClick={ props.delete }>
        <Xmark />
      </div>
      <div className="message text-box">
        { props.data.item }
      </div>
    </div>
  );
}

export default Doneitem;
