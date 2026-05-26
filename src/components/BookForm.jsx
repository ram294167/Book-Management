import React, { useEffect, useState } from 'react'

const empty = { title: '', author: '', genre: '', year: '' }

export default function BookForm({ onCreate, onUpdate, editing, onCancel }){
  const [form, setForm] = useState(empty)
  const [submitting, setSubmitting] = useState(false)

  useEffect(()=>{
    if (editing) setForm(editing)
    else setForm(empty)
  }, [editing])

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const payload = { ...form, year: Number(form.year) }
    try {
      if (editing) await onUpdate(editing.id, payload)
      else await onCreate(payload)
      setForm(empty)
    } catch (err) {
      // let parent handle errors
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="book-form" onSubmit={submit}>
      <h3>{editing ? 'Edit Book' : 'Add Book'}</h3>
      <input required placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
      <input required placeholder="Author" value={form.author} onChange={e=>setForm({...form, author:e.target.value})} />
      <input placeholder="Genre" value={form.genre} onChange={e=>setForm({...form, genre:e.target.value})} />
      <input type="number" placeholder="Year" value={form.year} onChange={e=>setForm({...form, year:e.target.value})} />
      <div className="form-actions">
        <button type="submit" disabled={submitting}>{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={()=>{ onCancel && onCancel(); setForm(empty); }} style={{marginLeft:8}}>Cancel</button>}
      </div>
    </form>
  )
}
