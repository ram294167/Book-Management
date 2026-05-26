import React, { useEffect, useState } from 'react'

const empty = { title: '', author: '', genre: '', year: '', image: '' }

export default function BookForm({ onCreate, onUpdate, editing, onCancel }){
  const [form, setForm] = useState(empty)
  const [preview, setPreview] = useState('')
  const [fileName, setFileName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(()=>{
    if (editing) {
      setForm({...empty, ...editing})
      setPreview(editing.image || '')
      setFileName('')
    } else {
      setForm(empty)
      setPreview('')
      setFileName('')
    }
  }, [editing])

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const payload = { ...form, year: form.year ? Number(form.year) : '' }
    try {
      if (editing) await onUpdate(editing.id, payload)
      else await onCreate(payload)
      setForm(empty)
      setPreview('')
      setFileName('')
    } catch (err) {
      // let parent handle errors
    } finally {
      setSubmitting(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result?.toString() || ''
      setForm(prev => ({ ...prev, image: result }))
      setPreview(result)
      setFileName(file.name)
    }
    reader.readAsDataURL(file)
  }

  return (
    <form className="book-form" onSubmit={submit} aria-live="polite">
      <h3 id="book-form-title">{editing ? 'Edit Book' : 'Add Book'}</h3>
      <div className="form-row">
        <label>
          Title
          <input required aria-required="true" name="title" placeholder="Enter title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        </label>
        <label>
          Author
          <input required aria-required="true" name="author" placeholder="Enter author" value={form.author} onChange={e=>setForm({...form, author:e.target.value})} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Genre
          <input name="genre" placeholder="e.g. Fiction" value={form.genre} onChange={e=>setForm({...form, genre:e.target.value})} />
        </label>
        <label>
          Publication Year
          <input type="number" name="year" placeholder="e.g. 2024" value={form.year} onChange={e=>setForm({...form, year:e.target.value})} />
        </label>
      </div>
      <div className="form-row-full">
        <label className="file-upload-label">
          <span className="file-upload-icon">📷</span>
          <span>Choose cover image</span>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {fileName && <div className="file-meta">Selected file: {fileName}</div>}
      </div>
      {preview && (
        <div className="image-preview">
          <div className="preview-label">Preview</div>
          <div className="preview-box">
            <img src={preview} alt="Selected cover preview" />
          </div>
        </div>
      )}
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={submitting} aria-busy={submitting}>{editing ? 'Update' : 'Create'}</button>
        {editing && <button className="btn btn-ghost" type="button" onClick={()=>{ onCancel && onCancel(); setForm(empty); setPreview(''); setFileName('') }}>Cancel</button>}
      </div>
    </form>
  )
}
