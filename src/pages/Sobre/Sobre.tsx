import './Sobre.css'

export default function Sobre() {
  return (
    <section className="sobre-section container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center mb-4">
            <div className="card-body">
              <h1 className="card-title fw-bold display-6 mb-3">Sobre o Projeto</h1>

              <p className="lead mb-2">Este projeto é um exemplo de aplicação CRUD (Create, Read, Update, Delete) para gerenciar uma lista de séries de TV.</p>
              <p>O objetivo deste projeto é demonstrar como criar uma aplicação simples de gerenciamento de dados, permitindo que os usuários adicionem novas séries, visualizem a lista de séries existentes e tenham uma experiência de navegação fluida.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}