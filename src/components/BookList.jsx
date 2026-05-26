import React from 'react'

function BookCard({b, onEdit, onDelete}){
  return (
    <article className="card" aria-label={`Book card for ${b.title}`}>
      {b.image ? (
        <img className="card-image" src={b.image} alt={`Cover for ${b.title}`} />
      ) : (
        <div className="card-image card-image-placeholder" aria-hidden="true">
          <span>no image</span>
        </div>
      )}
      <div>
        <div className="title">{b.title}</div>
        <div className="meta" aria-label="Author">{b.author}</div>
        <div className="meta" aria-label="Genre and year">{b.genre} · {b.year}</div>
      </div>
      <div className="card-footer">
        <div className="book-id">ID: {b.id}</div>
        <div className="card-actions">
          <button className="btn btn-ghost" onClick={()=>onEdit(b)} aria-label={`Edit ${b.title}`}>Edit</button>
          <button className="btn btn-danger" onClick={()=>onDelete(b.id)} aria-label={`Delete ${b.title}`}>Delete</button>
        </div>
      </div>
    </article>
  )
}

function SkeletonCard(){
  return (
    <article className="card card-skeleton" aria-hidden="true">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text short"></div>
      <div className="card-footer">
        <div className="skeleton skeleton-chip"></div>
        <div className="card-actions">
          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </div>
    </article>
  )
}

export default function BookList({books, onEdit, onDelete, loading}){
  if (loading) return (
    <div className="grid" aria-live="polite" aria-busy="true">
      {Array.from({length: 6}).map((_, index) => <SkeletonCard key={index} />)}
    </div>
  )

  if (!books.length) return <p>No books found.</p>
  return (
    <div className="grid">
      {books.map(b => <BookCard key={b.id} b={b} onEdit={onEdit} onDelete={onDelete} />)}
    </div>
  )
}
