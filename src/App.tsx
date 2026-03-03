import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
import SerieForm from './components/SerieForm/SerieForm'
import SerieList from './components/SerieList/SerieList'
import Home from './pages/Home/Home'
import Sobre from './pages/Sobre/Sobre'

import type { Serie } from './components/SerieList/SerieList'

import './App.css'

function App() {
  const [series, setSeries] = useState<Serie[]>([])

  const defaultSeries: Serie[] = [
    {
      id: 1,
      title: "Breaking Bad",
      seasons: 5,
      date: "2008-01-20",
      director: "Vince Gilligan",
      producer: "AMC",
      category: "Drama",
      watchedDate: "2024-01-10"
    }
  ]

  /* CARREGAR DO LOCALSTORAGE*/
  useEffect(() => {
    const storedSeries = localStorage.getItem('series')

    if (!storedSeries) {
      setSeries(defaultSeries)
      return
    }

    const parsed = JSON.parse(storedSeries)

    if (parsed.length === 0) {
      setSeries(defaultSeries)
    } else {
      setSeries(parsed)
    }
  }, [])

  /*SALVAR NO LOCALSTORAGE*/
  useEffect(() => {
    localStorage.setItem('series', JSON.stringify(series))
  }, [series])

  /*ADICIONAR SÉRIE*/
  const handleAddSerie = (newSerie: Serie) => {
    setSeries(prev => [...prev, newSerie])
  }

  /*EDITAR SÉRIE*/
  const handleEditSerie = (updatedSerie: Serie) => {
    setSeries(prev =>
      prev.map(serie =>
        serie.id === updatedSerie.id ? updatedSerie : serie
      )
    )
  }

  /* EXCLUIR SÉRIE */
  const handleDeleteSerie = (id: number) => {
    setSeries(prev => {
      const updated = prev.filter(serie => serie.id !== id)

      return updated.length === 0 ?  defaultSeries : updated
    })
  }

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />

        <Route
          path="/SerieForm"
          element={<SerieForm onAdd={handleAddSerie} />}
        />

        <Route
          path="/SerieList"
          element={
            <SerieList
              series={series}
              onEdit={handleEditSerie}
              onDelete={handleDeleteSerie}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App