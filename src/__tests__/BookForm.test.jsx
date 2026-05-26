import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import BookForm from '../components/BookForm'

describe('BookForm', () => {
  it('renders the form fields and allows submission', async () => {
    const onCreate = vi.fn()
    render(<BookForm onCreate={onCreate} onUpdate={vi.fn()} editing={null} onCancel={vi.fn()} />)

    fireEvent.change(screen.getByPlaceholderText(/Enter title/i), { target: { value: 'New Book' } })
    fireEvent.change(screen.getByPlaceholderText(/Enter author/i), { target: { value: 'Jane Doe' } })
    fireEvent.change(screen.getByPlaceholderText(/e.g. Fiction/i), { target: { value: 'Fantasy' } })
    fireEvent.change(screen.getByPlaceholderText(/e.g. 2024/i), { target: { value: '2024' } })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /create/i }))
    })

    expect(onCreate).toHaveBeenCalledWith({
      title: 'New Book',
      author: 'Jane Doe',
      genre: 'Fantasy',
      year: 2024,
      image: ''
    })
  })

  it('accepts a local image file and submits a data URL', async () => {
    const onCreate = vi.fn()
    render(<BookForm onCreate={onCreate} onUpdate={vi.fn()} editing={null} onCancel={vi.fn()} />)

    const file = new File(['dummy content'], 'cover.png', { type: 'image/png' })
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Cover image/i), { target: { files: [file] } })
    })

    await waitFor(() => expect(screen.getByAltText(/Selected cover preview/i)).toBeInTheDocument())

    fireEvent.change(screen.getByPlaceholderText(/Enter title/i), { target: { value: 'New Book' } })
    fireEvent.change(screen.getByPlaceholderText(/Enter author/i), { target: { value: 'Jane Doe' } })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /create/i }))
    })

    expect(onCreate).toHaveBeenCalledWith(expect.objectContaining({
      title: 'New Book',
      author: 'Jane Doe',
      image: expect.stringMatching(/^data:image\/png;base64,/)
    }))
  })
})
