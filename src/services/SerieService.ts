import api from "./api"
import type { Serie } from "../components/SerieList/SerieList"

// GET - listar todas
export const getSeries = async (): Promise<Serie[]> => {
  const response = await api.get("/series")
  return response.data
}

// GET por ID
export const getSerieById = async (id: number): Promise<Serie> => {
  const response = await api.get(`/series/${id}`)
  return response.data
}

// POST - criar
export const createSerie = async (serie: Serie) => {
  const response = await api.post("/series", serie)
  return response.data
}

// PUT - atualizar
export const updateSerie = async (serie: Serie) => {
  const response = await api.put("/series", serie)
  return response.data
}

// DELETE
export const deleteSerie = async (id: number) => {
  await api.delete(`/series/${id}`)
}