import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, but not url or likes by default', () => {
  const blog = {
    title: 'The Joel Test: 12 Steps to Better Code',
    author: 'Joel Spolsky',
    url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/',
    likes: 10,
  }

  render(<Blog blog={blog} />)

  // Varmistetaan, että title ja author renderöityvät
  expect(screen.getByRole('heading', { name: /The Joel Test: 12 Steps to Better Code/i })).toBeInTheDocument()
  expect(screen.getByText('Joel Spolsky')).toBeInTheDocument()

  // Varmistetaan, että url ja likes eivät renderöidy
  expect(screen.queryByText('http://example.com')).toBeNull()
  expect(screen.queryByText('5')).toBeNull()
})
