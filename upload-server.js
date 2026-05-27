const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

const app = express()

// Enable CORS
app.use(cors())

// Parse JSON
app.use(express.json())

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads')

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = path.basename(file.originalname, ext)

    cb(null, `${name}-${Date.now()}${ext}`)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'))
    }
  }
})

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir))

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'No file uploaded'
    })
  }

  const fileUrl =
    `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

  res.json({
    url: fileUrl
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok'
  })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Upload server running on port ${port}`)
})