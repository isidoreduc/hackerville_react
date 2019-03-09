import React from 'react'

const Button = ({onClick, className, children}) =>
      <span>
          <button onClick={onClick}
                className = {className}
                type='button'>
            {children}
          </button>
      </span>

export default Button