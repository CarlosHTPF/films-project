import { render, screen } from '@testing-library/react'
import SerieList from './SerieList'
import { BrowserRouter } from 'react-router-dom'

const mockSeries = [
  {
    id: 1,
    title: 'Breaking Bad',
    seasons: 5,
    date: '2008-01-20',
    director: 'Vince Gilligan',
    producer: 'AMC',
    category: 'Drama',
    watchedDate: '2023-01-01'
  }
]

function renderComponent() {
  render(
    <BrowserRouter>
      <SerieList series={mockSeries} />
    </BrowserRouter>
  )
}

describe('SerieList', () => {

  test('deve renderizar título da série', () => {
    renderComponent()
    expect(screen.getByText('Breaking Bad')).toBeInTheDocument()
  })

  test('deve mostrar produtora', () => {
    renderComponent()
    expect(screen.getByText(/AMC/)).toBeInTheDocument()
  })

})