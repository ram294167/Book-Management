import React from 'react'
import { render, screen } from '@testing-library/react'
import BookList from '../components/BookList'

describe('BookList', () => {
  it('shows skeleton cards while loading', () => {
    render(<BookList books={[]} loading={true} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getAllByRole('article', { hidden: true }).length).toBe(6)
  })

  it('renders a book card with optional image', () => {
    const book = { id: 1, title: 'Example', author: 'Author', genre: 'Fiction', year: 2024, image: 'https://example.com/img.jpg' }
    render(<BookList books={[book]} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', book.image)
    expect(screen.getByText(/Example/i)).toBeInTheDocument()
  })
})
