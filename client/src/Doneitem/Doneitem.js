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
        <svg transform="scale(-1,1)">
          <Checkmark />
        </svg>
      </div>
      <div
          className="svg-container"
          onClick={ () => props.delete(this.props.data.id) }>
        <Xmark />
      </div>
      <div className="message text-box">
        { props.data.item }
      </div>
    </div>
  );
}

export default Doneitem;
