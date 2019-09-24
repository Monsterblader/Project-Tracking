import React, { Component } from 'react';
import Plus from '../assets/Plus.js';
import './Additem.css';

class Additem extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.activateAdditem(this.input.current.value);
    this.input.current.value = "";
  }

  render() {
    return (
      <form
          className="add-item"
          onSubmit={ this.handleSubmit }>
        <div
            className="svg-container"
            onClick={ this.handleSubmit }>
          <Plus />
        </div>
        <input
          type="text"
          className="text-box"
          placeholder="Another day, another task"
          ref={ this.input }
        />
      </form>
    );
  }
}

export default Additem;
