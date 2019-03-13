import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import List from './components/ListComponent.js';
import Search from './components/SearchComponent.js';
import Button from './components/ButtonComponent.js';
// in {} when it's a named export in a class component; without braces when it's in a function component - implicit export

const DEFAULT_QUERY = '';
const DEFAULT_HPP = '50';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

//const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class App extends Component {
  // keeps track of the lifecycle state of the component
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.dismissItem = this.dismissItem.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  needsToSearchTopStories = (searchTerm) => !this.state.results[searchTerm];


  setSearchTopStories = (result) => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  fetchSearchTopStories = (searchKeyWord, page = 0) =>
    // same as axios.get()
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchKeyWord}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted & this.setSearchTopStories(result.data))
      .catch(error => this._isMounted & this.setState({ error }));

  componentDidMount = () => {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount = () => this._isMounted = false;

  onSubmitSearch = (event) => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }



  onSearchChange = (event) => this.setState({ searchTerm: event.target.value });

  dismissItem = (id) => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }


  render() {

    const {
      searchTerm,
      results,
      searchKey,
      error
    } = this.state;
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;
    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    //if (error) return <div className='container'><h1>Something went wrong!!!</h1></div>;

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
          error ?
            <div className='container'>
              <h1>Something went wrong!!!</h1>
            </div>
            :
            <div className='row'>
              <List list={list}
                dismissItem={this.dismissItem}
              />

              <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                More
        </Button>
            </div>
        }

        <br />
      </div>

    );
  }
}

export default App;
