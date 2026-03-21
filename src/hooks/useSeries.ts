import { useState, useEffect } from "react"
import type { Serie } from "../components/SerieList/SerieList"
import {
  getSeries,
  createSerie,
  updateSerie,
  deleteSerie
} from "../services/SerieService"

export function useSeries() {
  const [series, setSeries] = useState<Serie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSeries()
  }, [])

  const loadSeries = async () => {
    try {
      setLoading(true)
      const data = await getSeries()

      const formatted = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        seasons: item.seasons,
        date: item.releaseDate,
        director: item.director,
        producer: item.production,  
        category: item.category,
        watchedDate: item.watchedAt,
      }))

      setSeries(formatted)
    } catch (error) {
      console.error("Erro ao carregar séries", error)
    } finally {
      setLoading(false)
    }
  }

  const addSerie = async (newSerie: Serie) => {
    await createSerie(newSerie)
    loadSeries()
  }

  const editSerie = async (updatedSerie: Serie) => {
    await updateSerie(updatedSerie)
    loadSeries()
  }

  const removeSerie = async (id: number) => {
    await deleteSerie(id)
    loadSeries()
  }

  return {
    series,
    loading,
    addSerie,
    editSerie,
    removeSerie
  }
}