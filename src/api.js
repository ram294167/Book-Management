const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
// normalize: ensure we have a base origin (without a trailing /books) then append /books once
const apiBase = apiUrl.replace(/\/books\/?$/, '').replace(/\/$/, '')
const API = `${apiBase}/books`

// helpful for debugging in the browser console when deployed
try { console.debug('API config', { VITE_API_URL: apiUrl, apiBase, API }) } catch (_) {}

async function handleResponse(res, fallbackMessage) {
  let body = ''
  try {
    body = await res.text()
    // try to keep JSON if present
    try { body = JSON.parse(body) } catch (_) { /* leave as text */ }
  } catch (_) {}

  if (!res.ok) {
    const msg = typeof body === 'string' && body ? body : (body && body.message) || fallbackMessage
    throw new Error(`${res.status} ${res.statusText}: ${msg}`)
  }
  return typeof body === 'string' ? (body ? JSON.parse(body) : null) : body
}

export async function getBooks() {
  const res = await fetch(API)
  return handleResponse(res, 'Network error')
}

export async function createBook(payload) {
  let res
  try {
    res = await fetch(API, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    })
  } catch (err) {
    throw new Error(`Network request failed: ${err.message}`)
  }
  return handleResponse(res, 'Create failed')
}

export async function updateBook(id, payload) {
  let res
  try {
    res = await fetch(`${API}/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    })
  } catch (err) {
    throw new Error(`Network request failed: ${err.message}`)
  }
  return handleResponse(res, 'Update failed')
}

export async function deleteBook(id) {
  let res
  try {
    res = await fetch(`${API}/${id}`, { method: 'DELETE' })
  } catch (err) {
    throw new Error(`Network request failed: ${err.message}`)
  }
  await handleResponse(res, 'Delete failed')
  return true
}
