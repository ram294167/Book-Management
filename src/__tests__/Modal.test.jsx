import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import App from '../App'

describe('Modal UX', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: async () => [] }))
  })

  it('opens modal on Add Book and closes with Escape', async () => {
    render(<App />)

    const add = await screen.findByRole('button', { name: /add book/i })
    await act(async () => fireEvent.click(add))

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await act(async () => {
      fireEvent.keyDown(window, { key: 'Escape' })
    })

    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  })

  it('closes modal when clicking backdrop and via close button', async () => {
    render(<App />)
    const add = await screen.findByRole('button', { name: /add book/i })
    await act(async () => fireEvent.click(add))

    const backdrop = screen.getByRole('dialog')
    // clicking backdrop should close
    await act(async () => fireEvent.click(backdrop))
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())

    // open again and click close button
    await act(async () => fireEvent.click(await screen.findByRole('button', { name: /add book/i })))
    const closeBtn = await screen.findByLabelText(/close form/i)
    await act(async () => fireEvent.click(closeBtn))
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  })

  it('allows selecting and clearing a local image in the modal form', async () => {
    render(<App />)
    const add = await screen.findByRole('button', { name: /add book/i })
    await act(async () => fireEvent.click(add))

    const file = new File(['img'], 'cover.png', { type: 'image/png' })
    const fileInput = await screen.findByLabelText(/cover image/i)
    await act(async () => fireEvent.change(fileInput, { target: { files: [file] } }))

    await waitFor(() => expect(screen.getByAltText(/selected cover preview/i)).toBeInTheDocument())

    const clear = screen.getByLabelText(/remove selected image/i)
    await act(async () => fireEvent.click(clear))

    await waitFor(() => expect(screen.queryByAltText(/selected cover preview/i)).toBeNull())
  })
})
