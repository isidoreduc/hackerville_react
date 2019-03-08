import React, { Component } from 'react'
import Button from './ButtonComponent'



export class List extends Component {
    
  render() {
    const {list, pattern, dismissItem} = this.props; // destructuring
    const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      <div className='container'>
        {list.filter(isSearched(pattern)).map(item =>
          <div className='col text-center' key={item.objectID}>
            <a href={item.url}>{item.title}</a>
            <div>Author: {item.author}</div>
            <div>Points: {item.points}</div>
            <div>No. of comm: {item.num_comments}</div>
            <Button onClick={() => dismissItem(item.objectID)}
                    className='btn btn-primary'>
              Dismiss</Button>
            <hr className='col-4' />
          </div>
        )}
      </div>
    )
  }
}

export default List;
