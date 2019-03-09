import React from 'react'

const Search = ({ value, onChange, children }) =>
    <div className='container'>
        <form>
            <div className='row'>
                {children}<input type='text'
                    value={value}
                    onChange={onChange}
                    placeholder='search...' />
            </div>
            <br />
        </form>
    </div>

export default Search
