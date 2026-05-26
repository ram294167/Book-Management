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

  const handleCreate = async (payload) => {
    try {
      const item = await createBook(payload)
      setBooks(prev => [...prev, item])
    } catch (err) {
      setError('Create failed')
    }
  }

  const handleUpdate = async (id, payload) => {
    try {
      const item = await updateBook(id, payload)
      setBooks(prev => prev.map(b => b.id === id ? item : b))
      setEditing(null)
    } catch (err) {
      setError('Update failed')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this book?')) return
    try {
      await deleteBook(id)
      setBooks(prev => prev.filter(b => b.id !== id))
    } catch (err) {
      setError('Delete failed')
    }
  }

  const filtered = books.filter(b => {
    const matchQuery = (b.title + ' ' + b.author).toLowerCase().includes(query.toLowerCase())
    const matchGenre = genre === 'All' || b.genre === genre
    return matchQuery && matchGenre
  })

  return (
    <div className="app">
      <header>
        <h1>Book Management</h1>
      </header>
      <main>
        <section className="controls">
          <SearchBar value={query} onChange={setQuery} />
          <Filter books={books} value={genre} onChange={setGenre} />
        </section>

        <section className="content">
          <div className="list">
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
              <BookList books={filtered} onEdit={setEditing} onDelete={handleDelete} />
            )}
          </div>
          <div className="form">
            <BookForm onCreate={handleCreate} onUpdate={handleUpdate} editing={editing} onCancel={() => setEditing(null)} />
          </div>
        </section>
      </main>
    </div>
  )
}
