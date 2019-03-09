import React from 'react'
import Button from './ButtonComponent'

//'item.title &&' is a form of conditional check - same as: if(item.title) or if(item.title===true)
//const isSearched = searchTerm => item => item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase());
// destructuring the props parameter
const List = ({list, dismissItem}) => 

      <div className='container'>
        {list.map(item =>
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
