import React, { useEffect, useState } from 'react'
import { getBooks, createBook, updateBook, deleteBook } from './api'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import SearchBar from './components/SearchBar'
import Filter from './components/Filter'

export default function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [theme, setTheme] = useState('light')
  const [showModal, setShowModal] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getBooks()
      setBooks(data)
    } catch (err) {
      setError('Failed to load books')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    if (!showModal) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false)
        setEditing(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showModal])

  const openAdd = () => {
    setEditing(null)
    setShowModal(true)
  }

  const openEdit = (book) => {
    setEditing(book)
    setShowModal(true)
  }

  const handleCreate = async (payload) => {
    try {
      const item = await createBook(payload)
      setBooks(prev => [...prev, item])
      setShowModal(false)
    } catch (err) {
      setError(err?.message || 'Create failed')
    }
  }

  const handleUpdate = async (id, payload) => {
    try {
      const item = await updateBook(id, payload)
      setBooks(prev => prev.map(b => b.id === id ? item : b))
      setEditing(null)
      setShowModal(false)
    } catch (err) {
      setError(err?.message || 'Update failed')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this book?')) return
    try {
      await deleteBook(id)
      setBooks(prev => prev.filter(b => b.id !== id))
    } catch (err) {
      setError(err?.message || 'Delete failed')
    }
  }

  const filtered = books.filter(b => {
    const matchQuery = (b.title + ' ' + b.author).toLowerCase().includes(query.toLowerCase())
    const matchGenre = genre === 'All' || b.genre === genre
    return matchQuery && matchGenre
  })

  return (
    <div className={`app ${theme}`}>
      <header className="site-header">
        <div className="brand">
          <h1>Book Management</h1>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary add-book-btn" type="button" onClick={openAdd}>Add Book</button>
          <button className="icon-btn" onClick={()=>setTheme(t=> t==='light' ? 'dark' : 'light')}>{theme==='light' ? '🌙' : '☀️'}</button>
        </div>
      </header>
      <main>
        <section className="controls">
          <SearchBar value={query} onChange={setQuery} />
          <Filter books={books} value={genre} onChange={setGenre} />
        </section>

        <section className="content">
          <div className="list">
            {error ? (
              <p role="alert" className="status-message">{error}</p>
            ) : (
              <BookList books={filtered} onEdit={openEdit} onDelete={handleDelete} loading={loading} />
            )}
          </div>
        </section>
      </main>

      {showModal && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-form-title"
          onClick={() => { setShowModal(false); setEditing(null) }}
        >
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => { setShowModal(false); setEditing(null) }} aria-label="Close form">×</button>
            <BookForm onCreate={handleCreate} onUpdate={handleUpdate} editing={editing} onCancel={() => { setShowModal(false); setEditing(null) }} />
          </div>
        </div>
      )}
    </div>
  )
}
