import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'

test('renders title and author, but not url or likes or user by default', () => {
  const blog = {
    title: 'The Joel Test: 12 Steps to Better Code',
    author: 'Joel Spolsky',
    url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/',
    likes: 10,
    user: {
      name: 'Test User',
    },
  }

  render(<Blog blog={blog} />)

  // Varmistetaan, että title ja author renderöityvät
  expect(screen.getByRole('heading', { name: /The Joel Test: 12 Steps to Better Code/i })).toBeInTheDocument()
  expect(screen.getByText('Joel Spolsky')).toBeInTheDocument()

  // Varmistetaan, että url ja likes ja user eivät renderöidy
  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText(`Likes: ${blog.likes}`)).toBeNull()
  expect(screen.queryByText(`Added by: ${blog.user.name}`)).toBeNull()
})

test('renders url, likes, and user after clicking the view button', async () => {
  const blog = {
    title: 'The Joel Test: 12 Steps to Better Code',
    author: 'Joel Spolsky',
    url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/',
    likes: 10,
    user: {
      name: 'Test User',
    },
  }

  render(<Blog blog={blog} />)

  // Varmistetaan, että title ja author renderöityvät
  expect(screen.getByRole('heading', { name: /The Joel Test: 12 Steps to Better Code/i })).toBeInTheDocument()
  expect(screen.getByText('Joel Spolsky')).toBeInTheDocument()

  // Varmistetaan, että url ja likes eivät renderöidy alussa
  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText(`Likes: ${blog.likes}`)).toBeNull()
  expect(screen.queryByText(`Added by: ${blog.user.name}`)).toBeNull()

  // Simuloidaan "view"-napin klikkaus
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  // Varmistetaan, että url, likes ja käyttäjän nimi näkyvät nyt
  expect(screen.getByText(`URL: ${blog.url}`)).toBeInTheDocument()
  expect(screen.getByText(`Likes: ${blog.likes}`)).toBeInTheDocument()
  expect(screen.getByText(`Added by: ${blog.user.name}`)).toBeInTheDocument()
})

test('calls the like button handler twice when the like button is clicked twice', async () => {
  const blog = {
    title: 'The Joel Test: 12 Steps to Better Code',
    author: 'Joel Spolsky',
    url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/',
    likes: 10,
    user: {
      name: 'Test User',
    },
  }

  // Määritellään mock-funktio Vitestin avulla
  const mockHandler = vi.fn()

  render(<Blog blog={blog} updateBlogLikes={mockHandler} />)

  // Simuloidaan "view"-napin klikkaus, jotta like-nappi tulee näkyviin
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  // Haetaan like-nappi ja klikataan sitä kahdesti
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  // Varmistetaan, että mockHandler-funktiota kutsuttiin kahdesti
  expect(mockHandler).toHaveBeenCalledTimes(2)
})