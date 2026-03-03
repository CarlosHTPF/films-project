import { useState } from 'react'
import './SerieForm.css'
import type { Serie } from "../SerieList/SerieList"

type SerieFormProps = {
  onAdd: (serie: Serie) => void
}

type SerieFormElements = HTMLFormControlsCollection & {
  title: HTMLInputElement
  seasons: HTMLInputElement
  date: HTMLInputElement
  director: HTMLInputElement
  producer: HTMLInputElement
  category: HTMLInputElement
  watchedDate: HTMLInputElement
}

type SerieFormElement = HTMLFormElement & {
  elements: SerieFormElements
}

export default function SerieForm({ onAdd }: SerieFormProps) {

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget as SerieFormElement

    const newErrors: Record<string, string> = {}

    if (!form.elements.title.value.trim()) {
      newErrors.title = "O título é obrigatório."
    }

    if (!form.elements.seasons.value || parseInt(form.elements.seasons.value) <= 0) {
      newErrors.seasons = "Temporadas deve ser maior que 0"
    }

    if (!form.elements.date.value) {
      newErrors.date = "A data de lançamento é obrigatória."
    }

    if (!form.elements.director.value.trim()) {
      newErrors.director = "O diretor é obrigatório."
    }

    if (!form.elements.producer.value.trim()) {
      newErrors.producer = "A produtora é obrigatória."
    }

    if (!form.elements.category.value.trim()) {
      newErrors.category = "A categoria é obrigatória."
    }

    if (
      form.elements.date.value &&
      form.elements.watchedDate.value &&
      new Date(form.elements.watchedDate.value) <
      new Date(form.elements.date.value)
    ) {
      newErrors.watchedDate = "Data assistida não pode ser anterior ao lançamento."
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    const newSerie: Serie = {
      id: Date.now(),
      title: form.elements.title.value,
      seasons: parseInt(form.elements.seasons.value),
      date: form.elements.date.value,
      director: form.elements.director.value,
      producer: form.elements.producer.value,
      category: form.elements.category.value,
      watchedDate: form.elements.watchedDate.value
    }

    onAdd(newSerie)

    alert("Série adicionada com sucesso!")

    form.reset()
    setErrors({})
  }

  return (
    <div className="serie-form">
      <h2>Adicionar Nova Série</h2>

      <form onSubmit={handleSubmit} noValidate>

        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="seasons">Temporadas</label>
          <input
            type="number"
            id="seasons"
            name="seasons"
            className={errors.seasons ? "input-error" : ""}
          />
          {errors.seasons && <span className="error-text">{errors.seasons}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Data de Lançamento</label>
          <input
            type="date"
            id="date"
            name="date"
            className={errors.date ? "input-error" : ""}
          />
          {errors.date && <span className="error-text">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="director">Diretor</label>
          <input
            type="text"
            id="director"
            name="director"
            className={errors.director ? "input-error" : ""}
          />
          {errors.director && <span className="error-text">{errors.director}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="producer">Produtora</label>
          <input
            type="text"
            id="producer"
            name="producer"
            className={errors.producer ? "input-error" : ""}
          />
          {errors.producer && <span className="error-text">{errors.producer}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <input
            type="text"
            id="category"
            name="category"
            className={errors.category ? "input-error" : ""}
          />
          {errors.category && <span className="error-text">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="watchedDate">Data Assistida</label>
          <input
            type="date"
            id="watchedDate"
            name="watchedDate"
            className={errors.watchedDate ? "input-error" : ""}
          />
          {errors.watchedDate && <span className="error-text">{errors.watchedDate}</span>}
        </div>

        <button type="submit">Adicionar Série</button>

      </form>
    </div>
  )
}