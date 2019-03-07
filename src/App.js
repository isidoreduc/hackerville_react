import React, { Component } from 'react';
import './App.css';
import { LIST } from './model/model.js';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      list: LIST
    }
    this.dismissItem = this.dismissItem.bind(this);
  }

  dismissItem = (id) => {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({list: updatedList});
  }

  render() {
    return (
      <div className='container'>
        {this.state.list.map(item => 
          <div className='col text-center' key={item.objectID}>
            <a href={item.url}>{item.title}</a>
            <div>Author: {item.author}</div>
            <div>Points: {item.points}</div>
            <div>No. of comm: {item.num_comments}</div>
            <div><button onClick={() => this.dismissItem(item.objectID)} type='button'>
              Dismiss</button></div>
            <hr className='col-4'/>
          </div>
          
        )}

      </div>

    );
  }
}

export default App;
