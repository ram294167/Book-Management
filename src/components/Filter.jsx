import React from 'react'

export default function Filter({ books, value, onChange }){
  const genres = Array.from(new Set(books.map(b=>b.genre).filter(Boolean)))
  return (
    <select value={value} onChange={e=>onChange(e.target.value)}>
      <option value="All">All Genres</option>
      {genres.map(g => <option key={g} value={g}>{g}</option>)}
    </select>
  )
}
