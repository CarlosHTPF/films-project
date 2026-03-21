import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './SerieForm.css'
import type { Serie } from "../SerieList/SerieList"

type SerieFormProps = {
  onAdd?: (serie: Serie) => void
  onEdit?: (serie: Serie) => void
  series?: Serie[]
}

export default function SerieForm({ onAdd, onEdit, series }: SerieFormProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<Serie>({
    id: 0,
    title: '',
    seasons: 0,
    date: '',
    director: '',
    producer: '',
    category: '',
    watchedDate: ''
  })

  // 🔹 Carregar dados quando for edição
  useEffect(() => {
    if (id && series) {
      const serie = series.find(s => s.id === Number(id))
      if (serie) {
        setFormData({
          id: serie.id ?? 0,
          title: serie.title ?? '',
          seasons: serie.seasons ?? 0,
          date: serie.date ?? '',
          director: serie.director ?? '',
          producer: serie.producer ?? '',
          category: serie.category ?? '',
          watchedDate: serie.watchedDate ?? ''
        })
      }
    }
  }, [id, series])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: name === 'seasons' ? Number(value) : value
    }))
  }

  function validate() {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "O título é obrigatório."
    if (!formData.seasons || formData.seasons <= 0)
      newErrors.seasons = "Temporadas deve ser maior que 0"
    if (!formData.date) newErrors.date = "A data de lançamento é obrigatória."
    if (!formData.director.trim()) newErrors.director = "O diretor é obrigatório."
    if (!formData.producer.trim()) newErrors.producer = "A produtora é obrigatória."
    if (!formData.category.trim()) newErrors.category = "A categoria é obrigatória."

    if (
      formData.date &&
      formData.watchedDate &&
      new Date(formData.watchedDate) < new Date(formData.date)
    ) {
      newErrors.watchedDate = "Data assistida não pode ser anterior ao lançamento."
    }

    return newErrors
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    if (id) {
      // ✏️ EDITAR
      onEdit?.(formData)
      alert("Série editada com sucesso!")
    } else {
      // ➕ CRIAR
      onAdd?.({ ...formData, id: Date.now() })
      alert("Série adicionada com sucesso!")
    }

    navigate("/SerieList")
  }

  return (
    <section className="serie-section d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">

            <div className="card serie-card p-4 shadow">

              <h3 className="text-center mb-4 titulo">
                {id ? "Editar série" : "Cadastrar série"}
              </h3>

              <form onSubmit={handleSubmit} noValidate>

                {/* TÍTULO */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Título *</label>
                  <input
                    id='title'
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.title}</div>
                </div>

                {/* TEMPORADAS */}
                <div className="mb-3">
                  <label htmlFor="seasons" className="form-label">Número de Temporadas *</label>
                  <input
                    id='seasons'
                    type="number"
                    name="seasons"
                    value={formData.seasons}
                    onChange={handleChange}
                    className={`form-control ${errors.seasons ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.seasons}</div>
                </div>

                {/* DATA LANÇAMENTO */}
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Data de Lançamento *</label>
                  <input
                    id='date'
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.date}</div>
                </div>

                {/* DIRETOR */}
                <div className="mb-3">
                  <label htmlFor="director" className="form-label">Diretor *</label>
                  <input
                    id='director'
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                    className={`form-control ${errors.director ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.director}</div>
                </div>

                {/* PRODUTORA */}
                <div className="mb-3">
                  <label htmlFor="producer"  className="form-label">Produtora *</label>
                  <input
                    id='producer'
                    name="producer"
                    value={formData.producer}
                    onChange={handleChange}
                    className={`form-control ${errors.producer ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.producer}</div>
                </div>

                {/* CATEGORIA */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Categoria *</label>
                  <input
                    id='category'
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.category}</div>
                </div>

                {/* DATA ASSISTIDA */}
                <div className="mb-3">
                  <label htmlFor="watchedDate" className="form-label">Data assistida</label>
                  <input
                    id='watchedDate'
                    type="date"
                    name="watchedDate"
                    value={formData.watchedDate}
                    onChange={handleChange}
                    className={`form-control ${errors.watchedDate ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.watchedDate}</div>
                </div>

                {/* BOTÕES */}
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/SerieList")}
                  >
                    CANCELAR
                  </button>

                  <button type="submit" className="btn btn-primary">
                    SALVAR
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}