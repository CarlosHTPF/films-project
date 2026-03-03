import React, { useState } from 'react'
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
  onEdit?: (serie: Serie) => void
  onDelete?: (id: number) => void
}

type SerieErrors = {
  title?: string
  seasons?: string
  date?: string
  director?: string
  producer?: string
  category?: string
  watchedDate?: string
}

export default function SerieList({ series, onEdit, onDelete }: SerieListProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formState, setFormState] = useState<Serie | null>(null)
  const [errors, setErrors] = useState<SerieErrors>({})

  function validate(serie: Serie): SerieErrors {
    const newErrors: SerieErrors = {}

    if (!serie.title.trim()) newErrors.title = 'Título é obrigatório'
    if (!serie.seasons || serie.seasons <= 0)
      newErrors.seasons = 'Temporadas deve ser maior que 0'
    if (!serie.date) newErrors.date = 'Data de lançamento é obrigatória'
    if (!serie.director.trim()) newErrors.director = 'Diretor é obrigatório'
    if (!serie.producer.trim()) newErrors.producer = 'Produtora é obrigatória'
    if (!serie.category.trim()) newErrors.category = 'Categoria é obrigatória'
    if (!serie.watchedDate)
      newErrors.watchedDate = 'Data assistida é obrigatória'
    if (
      new Date(serie.watchedDate) <
      new Date(serie.date)
    ) {
      newErrors.watchedDate =
        'Data assistida não pode ser anterior ao lançamento'
    }

    return newErrors
  }

  function startEdit(serie: Serie) {
    setEditingId(serie.id)
    setFormState({ ...serie })
    setErrors({})
  }

  function cancelEdit() {
    setEditingId(null)
    setFormState(null)
    setErrors({})
  }

  function saveEdit() {
    if (!formState) return

    const validationErrors = validate(formState)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    if (onEdit) onEdit(formState)

    setEditingId(null)
    setFormState(null)
    setErrors({})
  }

  function handleDelete(id: number) {
    if (!confirm('Deseja realmente excluir esta série?')) return
    if (onDelete) onDelete(id)
  }

  return (
    <div className="serie-list">
      {series.map((serie) => {
        const isEditing = editingId === serie.id
        return (
          <div key={serie.id} className="serie-list__item">

            <div className="serie-item__header">
              {isEditing ? (
                <>
                  <label className="serie-item__label">Título</label>
                  <input
                    className={errors.title ? 'input-error' : ''}
                    value={formState?.title ?? ''}
                    onChange={(e) =>
                      setFormState((s) =>
                        s ? { ...s, title: e.target.value } : s
                      )
                    }
                  />
                  {errors.title && (
                    <small className="error-text">{errors.title}</small>
                  )}

                  <label className="serie-item__label">Data</label>
                  <input
                    type="date"
                    className={errors.date ? 'input-error' : ''}
                    value={formState?.date ?? ''}
                    onChange={(e) =>
                      setFormState((s) =>
                        s ? { ...s, date: e.target.value } : s
                      )
                    }
                  />
                  {errors.date && (
                    <small className="error-text">{errors.date}</small>
                  )}
                </>
              ) : (
                <>
                  <h3 className="serie-item__title">{serie.title}</h3>
                  <span className="serie-item__year">{serie.date}</span>
                </>
              )}
            </div>

            <div className="serie-item__content">
              {isEditing ? (
                <>
                  <label className="serie-item__label">Temporadas</label>
                  <input
                    type="number"
                    className={errors.seasons ? 'input-error' : ''}
                    value={String(formState?.seasons ?? '')}
                    onChange={(e) =>
                      setFormState((s) =>
                        s
                          ? { ...s, seasons: Number(e.target.value) }
                          : s
                      )
                    }
                  />
                  {errors.seasons && (
                    <small className="error-text">{errors.seasons}</small>
                  )}

                  <label className="serie-item__label">Diretor</label>
                  <input
                    className={errors.director ? 'input-error' : ''}
                    value={formState?.director ?? ''}
                    onChange={(e) =>
                      setFormState((s) =>
                        s ? { ...s, director: e.target.value } : s
                      )
                    }
                  />
                  {errors.director && (
                    <small className="error-text">{errors.director}</small>
                  )}

                  <label className="serie-item__label">Produtora</label>
                  <input
                    className={errors.producer ? 'input-error' : ''}
                    value={formState?.producer ?? ''}
                    onChange={(e) =>
                      setFormState((s) =>
                        s ? { ...s, producer: e.target.value } : s
                      )
                    }
                  />
                  {errors.producer && (
                    <small className="error-text">{errors.producer}</small>
                  )}

                  <label className="serie-item__label">Categoria</label>
                  <input
                    className={errors.category ? 'input-error' : ''}
                    value={formState?.category ?? ''}
                    onChange={(e) =>
                      setFormState((s) =>
                        s ? { ...s, category: e.target.value } : s
                      )
                    }
                  />
                  {errors.category && (
                    <small className="error-text">{errors.category}</small>
                  )}

                  <label className="serie-item__label">Assistida em</label>
                  <input
                    type="date"
                    className={errors.watchedDate ? 'input-error' : ''}
                    value={formState?.watchedDate ?? ''}
                    onChange={(e) =>
                      setFormState((s) =>
                        s ? { ...s, watchedDate: e.target.value } : s
                      )
                    }
                  />
                  {errors.watchedDate && (
                    <small className="error-text">{errors.watchedDate}</small>
                  )}
                </>
              ) : (
                <>
                  <p className="serie-item__desc"><strong>Temporadas:</strong> {serie.seasons}</p>
                  <p className="serie-item__desc"><strong>Diretor:</strong> {serie.director}</p>
                  <p className="serie-item__desc"><strong>Produtora:</strong> {serie.producer}</p>
                  <p className="serie-item__desc"><strong>Categoria:</strong> {serie.category}</p>
                  <p className="serie-item__desc"><strong>Assistida em:</strong> {serie.watchedDate}</p>
                </>
              )}
            </div>

            <div className="serie-item__actions">
              {isEditing ? (
                <>
                  <button className="btn--edit" onClick={saveEdit}>
                    Salvar
                  </button>
                  <button onClick={cancelEdit}>Cancelar</button>
                </>
              ) : (
                <>
                  <button
                    className="btn--edit"
                    onClick={() => startEdit(serie)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn--delete"
                    onClick={() => handleDelete(serie.id)}
                  >
                    Excluir
                  </button>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}