import React from 'react'

function inputField({ type, onchange, placeholder, value }) {
    return (
        <input type={type || 'text'} value={value} onChange={(e) => onchange(e.target.value)} placeholder={placeholder} className='px-5 py-2  outline-none focus:shadow-md focus:shadow-black/10 rounded-md' />
    )
}

export default inputField