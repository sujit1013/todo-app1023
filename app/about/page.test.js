import { render, screen } from '@testing-library/react'
import AboutPage from './page'

test('見出しが表示される', () => {
  render(<AboutPage />)
  expect(screen.getByRole('heading', { level: 1, name: 'このアプリについて' })).toBeInTheDocument()
})
