import React from 'react'

export default function SearchBar({ value, onChange }){
  return (
    <div className="search" role="search">
      <input aria-label="Search books by title or author" placeholder="Search by title or author" value={value} onChange={e=>onChange(e.target.value)} />
      {value && <button className="clear-btn" onClick={()=>onChange('')} aria-label="Clear search">✕</button>}
    </div>
  )
}
