import React, { Component } from 'react';
import './App.css';
import List from './components/ListComponent.js';
import Search from './components/SearchComponent.js';
import { LIST } from './model/model.js';
// in {} when it's a named export in a class component; without braces when it's in a function component - implicit export


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: LIST,
      searchTerm: ''
    }
    this.dismissItem = this.dismissItem.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange = (event) => this.setState({ searchTerm: event.target.value });

  dismissItem = (id) => {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }


  render() {
    const { searchTerm, list } = this.state;

    return (
      <div className='container'>
        <br />
        <div className='row'>
          <Search value={searchTerm}
            onChange={this.onSearchChange}
          >  </Search>
        </div>
        <List list={list}
          pattern={searchTerm}
          dismissItem={this.dismissItem}
        />

      </div>

    );
  }
}

export default App;
