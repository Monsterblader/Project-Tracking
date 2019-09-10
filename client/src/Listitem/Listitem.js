import React, { Component } from 'react';
import Checkmark from '../assets/Checkmark.js';
import Xmark from '../assets/Xmark.js';
import Edititem from './Edititem/Edititem.js';
import './Listitem.css';

class Listitem extends Component {
  constructor(props) {
    super();

    this.state = {
      edit: false,
      editedItem: props.data.item,
    };
  }

  render() {
    return (
      <div
          className="list-item"
          key={ this.props.data.id }>
        { this.state.edit
          ? <Edititem
                itemState={ this.state }
                cancel={ () => this.setState({ edit: false }) }
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
                  onMouseOver={ () => this.setState({ edit: true })}>
                { this.state.editedItem }
              </div>
            </div>
        }
      </div>
    );
  }
}

export default Listitem;
