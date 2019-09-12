import React, { Component } from 'react';
import Plus from "../../assets/Plus.js";
import './Edititem.css';

class Edititem extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.updateItem(this.input.current.value);
    this.props.cancel();
    e.preventDefault();
  }

  render() {
    return (
      <form
          className="edit-item"
          onSubmit={ this.handleSubmit }>
        <div
            className="svg-container"
            onClick={ this.handleSubmit }>
          <Plus />
        </div>
        <input
          className="text-box"
          defaultValue={ this.props.item }
          ref={ this.input }
          onBlur={ e => {
            e.target.value = this.props.item;
            this.props.cancel(); } }
          autoFocus
        />
      </form>
    );
  }
}

export default Edititem;
