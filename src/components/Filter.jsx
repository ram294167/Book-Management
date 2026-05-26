import React from 'react'

export default function Filter({ books, value, onChange }){
  const genres = Array.from(new Set(books.map(b=>b.genre).filter(Boolean)))
  return (
    <label style={{display:'flex',gap:'8px',alignItems:'center',fontSize:'14px',color:'#475569'}}>
      Genre
      <select aria-label="Filter books by genre" value={value} onChange={e=>onChange(e.target.value)}>
        <option value="All">All Genres</option>
        {genres.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
    </label>
  )
}
