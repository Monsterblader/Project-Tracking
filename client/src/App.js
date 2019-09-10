// https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274
import React, { Component } from 'react';
import axios from 'axios';
import Additem from './Additem/Additem.js';
import Doneitem from './Doneitem/Doneitem.js';
import Listitem from './Listitem/Listitem.js';
import './App.css';

class App extends Component {
  // Initialize our state;
  state = {
    data: [],
    id: 0,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  // When component mounts, the first thing that it does is fetch all existing
  // data in our db.  Then we incorporate a polling logic so that we can easily
  // see if our db has changed and implement those changes into our UI.
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // Just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or Delete.
  // For our back end, we use the object id assiged by MongoDB to modify
  // database entries.

  // Our first get method uses our back-end API to fetch data from our database.
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // Our put method that uses our back-end API to create a new entry into our
  // database.
  putDataToDb = (item) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      item: item,
      completed: false,
    });
  };

  // Our delete method that uses oiur back-end API to remove existing database
  // information.
  deleteFromDb = (idToDelete) => {
    parseInt(idToDelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idToDelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // Our update method that uses our back-end API to overwrite existing
  // database information.
  updateDb = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: updateToApply,
    });
  };

  // Here is our UI.  It is easy to understand their functions when you
  // see them rendered.
  render() {
    const { data } = this.state;
    return (
      <div className="page-container">
        <Additem activateAdditem={ item => this.putDataToDb(item) } updateItem={ this.updateDb } />
        <div className="todo-list">
          {data.length <= 0
            ? <div className="text-box">Congratulations!&nbsp; You've been so productive that you have no more tasks.&nbsp; Now get off of your lazy ass and add something.</div>
            : data
                .filter( dat => !dat.completed )
                .map( dat =>
                  <Listitem
                      data={ dat }
                      delete={ this.deleteFromDb }
                      updateItem={ item => this.updateDb(dat.id, item) }
                      key={ dat.id } />
            )}
        </div>
        <hr />
        <div className="done-list">
          {data
            .filter( dat => dat.completed )
            .map( dat =>
              <Doneitem
                  data={ dat }
                  delete={ this.deleteFromDb }
                  uncompleteItem={ () => this.updateDb(dat.id, { completed: false }) }
                  key={ dat.id } />
          )}
        </div>
      </div>
    );
  }
}

export default App;
