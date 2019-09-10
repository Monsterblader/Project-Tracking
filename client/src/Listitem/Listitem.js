import React, { Component } from 'react';
import Checkmark from '../assets/Checkmark.js';
import Xmark from '../assets/Xmark.js';
import Edititem from './Edititem/Edititem.js';
import './Listitem.css';

class Listitem extends Component {
  state = {
    edit: false,
    editedItem: this.props.data.item,
  };

  render() {
    return (
      <div
          className="list-item"
          key={ this.props.data.id }>
        { this.state.edit
          ? <Edititem
                itemState={ this.state }
                changeItem={ newItem => this.setState({ editedItem: newItem }) }
                updateItem={ newItem => {
                  this.setState({ edit: false });
                  this.props.updateItem({ item: newItem });
                }}/>
          : <div>
              <div
                  className="svg-container"
                  onClick={ () => this.props.updateItem({ completed: true }) }>
                <Checkmark />
              </div>
              <div
                  className="svg-container"
                  onClick={ () => this.props.delete(this.props.data.id) }>
                <Xmark />
              </div>
              <div
                  className="message text-box"
                  onClick={ () => this.setState({ edit: true })}>
                { this.props.data.item }
              </div>
            </div>
        }
      </div>
    );
  }
}

export default Listitem;
