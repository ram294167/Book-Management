const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const API = apiUrl.replace(/\/$/, '').endsWith('/books')
  ? apiUrl.replace(/\/$/, '')
  : `${apiUrl.replace(/\/$/, '')}/books`

export async function getBooks() {
  const res = await fetch(API)
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

export async function createBook(payload) {
  const res = await fetch(API, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Create failed')
  return res.json()
}

export async function updateBook(id, payload) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Update failed')
  return res.json()
}

export async function deleteBook(id) {
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Delete failed')
  return true
}
