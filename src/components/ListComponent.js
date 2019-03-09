import React from 'react'
import Button from './ButtonComponent'


const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());
// destructuring the props parameter
const List = ({list, pattern, dismissItem}) => 

      <div className='container'>
        {list.filter(isSearched(pattern)).map(item =>
          <div className='col' key={item.objectID}>
            <a href={item.url}>{item.title}</a><span> | </span>
            <span>Author: {item.author}</span><span> | </span>
            <span>Points: {item.points}</span><span> | </span>
            <span>No. of comm: {item.num_comments}</span><span> </span>
            <Button onClick={() => dismissItem(item.objectID)}
                    className='btn btn-primary'>
              Dismiss</Button>
            <hr />
          </div>
        )}
      </div>
    
  


export default List
