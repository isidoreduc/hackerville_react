import React from 'react'

const Search = ({ value, onChange, onSubmit, children }) =>
    <div className='container'>
        <form onSubmit={onSubmit}>
            <div className='row'>
                <input type='text'
                    value={value}
                    onChange={onChange}
                    placeholder='search...' />
                <button type="submit">
                    {children}
                </button>
            </div>
            <br />
        </form>
    </div>

export default Search
