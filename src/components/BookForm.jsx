import React, { useEffect, useState } from 'react'

const empty = { title: '', author: '', genre: '', year: '', image: '', imageName: '' }

export default function BookForm({ onCreate, onUpdate, editing, onCancel }){
  const [form, setForm] = useState(empty)
  const [preview, setPreview] = useState('')
  const [fileName, setFileName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(()=>{
    if (editing) {
      setForm({...empty, ...editing})
      setPreview(editing.image || '')
      setFileName(editing.imageName || '')
    } else {
      setForm(empty)
      setPreview('')
      setFileName('')
    }
  }, [editing])

  const slugify = (value) => value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  const updateTitle = (value) => {
    setForm(prev => {
      const updated = { ...prev, title: value }
      if (prev.image) {
        const ext = prev.imageName?.split('.').pop() || 'png'
        const imageNameValue = `${slugify(value) || 'image'}.${ext}`
        setFileName(imageNameValue)
        return { ...updated, imageName: imageNameValue }
      }
      return updated
    })
  }

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
      const ext = file.name.split('.').pop() || 'png'
      const titleSlug = form.title ? slugify(form.title) : slugify(file.name.replace(/\.[^/.]+$/, ''))
      const imageNameValue = `${titleSlug || 'image'}.${ext}`

      setForm(prev => ({ ...prev, image: result, imageName: imageNameValue }))
      setPreview(result)
      setFileName(imageNameValue)
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setForm(prev => ({ ...prev, image: '', imageName: '' }))
    setPreview('')
    setFileName('')
  }

  return (
    <form className="book-form" onSubmit={submit} aria-live="polite">
      <h3 id="book-form-title">{editing ? 'Edit Book' : 'Add Book'}</h3>
      <div className="form-row">
        <label>
          Title
          <input required aria-required="true" name="title" placeholder="Enter title" value={form.title} onChange={e=>updateTitle(e.target.value)} />
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
            <button type="button" className="clear-image" onClick={clearImage} aria-label="Remove selected image">✕</button>
            <img src={preview} alt="Selected cover preview" />
          </div>
          {form.imageName && <div className="file-meta">Image record name: {form.imageName}</div>}
        </div>
      )}
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={submitting} aria-busy={submitting}>{editing ? 'Update' : 'Create'}</button>
        {editing && <button className="btn btn-ghost" type="button" onClick={()=>{ onCancel && onCancel(); setForm(empty); setPreview(''); setFileName('') }}>Cancel</button>}
      </div>
    </form>
  )
}
