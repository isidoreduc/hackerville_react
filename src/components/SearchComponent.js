import React, { Component } from 'react'

export class Search extends Component {
    render() {
        // children property of props object allows us to pass elements from above the tree 
        // (eg. in this case, the 'Serch for a title' string will be shown where {children} interpolation occurs)
        const { value, onChange, children } = this.props;

        return (
            <div className='container'>
                <form>
                    <div className='text-center'>
                        {children}<input type='text'
                            value={value}
                            onChange={onChange}
                            placeholder='search...' />
                    </div>
                    <br />
                </form>
            </div>
        )
    }
}

export default Search;
