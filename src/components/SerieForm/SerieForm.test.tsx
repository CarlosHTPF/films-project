import { render, screen, fireEvent } from '@testing-library/react'
import SerieForm from './SerieForm'
import { BrowserRouter } from 'react-router-dom'

function renderComponent() {
  render(
    <BrowserRouter>
      <SerieForm />
    </BrowserRouter>
  )
}

describe('SerieForm', () => {

  test('deve renderizar o formulário', () => {
    renderComponent()
    expect(screen.getByText(/Cadastrar série/i)).toBeInTheDocument()
  })

  test('deve mostrar erro ao enviar vazio', () => {
    renderComponent()

    const button = screen.getByText(/SALVAR/i)
    fireEvent.click(button)

    expect(screen.getByText(/O título é obrigatório/i)).toBeInTheDocument()
  })

  test('deve preencher input', () => {
    renderComponent()

    const input = screen.getByLabelText(/Título/i)
    fireEvent.change(input, { target: { value: 'Dark' } })

    expect(input).toHaveValue('Dark')
  })

})