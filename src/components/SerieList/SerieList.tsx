import { useNavigate } from 'react-router-dom'
import './SerieList.css'

export type Serie = {
  id: number
  title: string
  seasons: number
  date: string
  director: string
  producer: string
  category: string
  watchedDate: string
}

type SerieListProps = {
  series: Serie[]
  onDelete?: (id: number) => void
}

export default function SerieList({ series, onDelete }: SerieListProps) {
  const navigate = useNavigate()

  function handleDelete(id: number) {
    if (!confirm('Deseja realmente excluir esta série?')) return
    onDelete?.(id)
  }

return (
  <section className="serie-list-section">
    <div className="container py-5">

      {/* CARD CENTRAL */}
      <div className="list-card shadow p-4">

        <h2 className="text-center mb-4 titulo">
          Lista de séries
        </h2>

        <div className="row">
          {series.map((serie) => (
            <div key={serie.id} className="col-md-6 col-lg-4 mb-4">

              <div className="card serie-card h-100">

                <div className="card-body">
                  <h5 className="fw-bold">{serie.title}</h5>

                  <p className="small text-muted mb-2">
                    Data de lançamento: {serie.date}
                  </p>

                  <p className="small mb-1">
                    <strong>Número de temporadas:</strong> {serie.seasons}
                  </p>
                  <p className="small mb-1">
                    <strong>Diretor:</strong> {serie.director}
                  </p>
                  <p className="small mb-1">
                    <strong>Produtora:</strong> {serie.producer}
                  </p>
                  <p className="small mb-1">
                    <strong>Categoria:</strong> {serie.category}
                  </p>
                  <p className="small mb-1">
                    <strong>Data em que assistiu:</strong> {serie.watchedDate}
                  </p>
                </div>

                {/* BOTÕES (ÍCONES) */}
                <div className="card-footer bg-white border-0 d-flex justify-content-end gap-2">

                  <button
                    className="btn btn-icon text-primary"
                    onClick={() => navigate(`/edit/${serie.id}`)}
                  >
                    ✏️
                  </button>

                  <button
                    className="btn btn-icon text-danger"
                    onClick={() => handleDelete(serie.id)}
                  >
                    🗑️
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
)
}