import React, { Component } from 'react';
import './App.css';
import { LIST } from './model/model.js';

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

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
    return (
      <div className='container'>
        <form>
          <div className='text-center'>
            <input type='text' placeholder='search...' onChange={this.onSearchChange}></input>
          </div>
          <br />
        </form>
        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item =>
          <div className='col text-center' key={item.objectID}>
            <a href={item.url}>{item.title}</a>
            <div>Author: {item.author}</div>
            <div>Points: {item.points}</div>
            <div>No. of comm: {item.num_comments}</div>
            <div><button onClick={() => this.dismissItem(item.objectID)} type='button'>
              Dismiss</button></div>
            <hr className='col-4' />
          </div>

        )}

      </div>

    );
  }
}

export default App;
