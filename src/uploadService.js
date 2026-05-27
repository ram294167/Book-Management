const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL || 'http://localhost:5000'

export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  
  const res = await fetch(`${UPLOAD_URL}/upload`, {
    method: 'POST',
    body: formData
  })
  
  if (!res.ok) {
    throw new Error('Image upload failed')
  }
  
  const data = await res.json()
  return data.url
}
