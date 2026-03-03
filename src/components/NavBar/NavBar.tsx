import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className='navbar-list'>
        <li className='itens'>
          <Link to="/">Página Inicial</Link>
        </li>

        <li className='itens'>
          <Link to="/sobre">Sobre</Link>
        </li>

        <li className='itens'>
          <Link to="/SerieForm">Cadastrar Séries</Link>
        </li>

        <li className='itens'>
          <Link to="/SerieList">Lista de Séries</Link>
        </li>
      </ul>
    </nav>
  )
}