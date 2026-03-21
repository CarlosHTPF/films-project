import { NavLink } from "react-router-dom"
import './NavBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-4">
      
      {/* Logo */}
      <NavLink className="navbar-brand" to="/">
        SerieJournal
      </NavLink>

      {/* Botão mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Página Inicial
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/sobre" className="nav-link">
              Sobre
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/SerieForm" className="nav-link">
              Cadastrar
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/SerieList" className="nav-link">
              Séries
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  )
}