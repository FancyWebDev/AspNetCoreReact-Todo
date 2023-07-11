import React from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

it('renders without crashing', async () => {
  const div = document.createElement('div')
  const root = createRoot(div)
  root.render(
    <MemoryRouter>
      <App/>
    </MemoryRouter>)
  await new Promise(resolve => setTimeout(resolve, 1000))
})

test('should return sum of two numbers', () => {
  const a = 1, b = 2
  expect(sumTwo(a, b)).toEqual(3)
})

function sumTwo(a, b) {
  return a + b
}