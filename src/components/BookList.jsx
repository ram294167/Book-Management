import React from 'react'

function BookRow({b, onEdit, onDelete}){
  return (
    <div className="book-row">
      <div>
        <strong>{b.title}</strong>
        <div className="meta">{b.author} · {b.genre} · {b.year}</div>
      </div>
      <div className="actions">
        <button onClick={()=>onEdit(b)}>Edit</button>
        <button className="danger" onClick={()=>onDelete(b.id)}>Delete</button>
      </div>
    </div>
  )
}

export default function BookList({books, onEdit, onDelete}){
  if (!books.length) return <p>No books found.</p>
  return (
    <div>
      {books.map(b => <BookRow key={b.id} b={b} onEdit={onEdit} onDelete={onDelete} />)}
    </div>
  )
}
