import React from 'react'

export default function SearchBar({ value, onChange }){
  return (
    <input className="search" placeholder="Search by title or author" value={value} onChange={e=>onChange(e.target.value)} />
  )
}
