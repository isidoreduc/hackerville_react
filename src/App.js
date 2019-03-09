import React, { Component } from 'react';
import './App.css';
import List from './components/ListComponent.js';
import Search from './components/SearchComponent.js';
// in {} when it's a named export in a class component; without braces when it's in a function component - implicit export

const DEFAULT_QUERY = 'ragalie';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

//const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.dismissItem = this.dismissItem.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }


  setSearchTopStories = (result) => this.setState({ result });

  fetchSearchTopStories = (searchKeyWord) =>
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchKeyWord}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);

  componentDidMount = () => this.fetchSearchTopStories(this.state.searchTerm);


  onSubmitSearch = (event) => {this.fetchSearchTopStories(this.state.searchTerm);event.preventDefault();}



  onSearchChange = (event) => this.setState({ searchTerm: event.target.value });

  dismissItem = (id) => {
    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id);
    this.setState({ result: { ...this.state.result, hits: updatedHits } }); // spread operator = creates a new object that adds the new property 'hits' to the array of property objects 'result'
  }


  render() {
    const { searchTerm, result } = this.state;
    if (!result) return null; // or 'result && '

    return (
      <div className='container'>
        <br />
        <div className='row'>
          <Search value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSubmitSearch}
          >  Search</Search>
        </div>
        {
          result ?                                                  // show list only if there's data
            <List list={result.hits}
              dismissItem={this.dismissItem}
            /> : null
        }
      </div>
    );
  }
}

export default App;
