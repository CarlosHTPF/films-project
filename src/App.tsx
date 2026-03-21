import { useSeries } from "./hooks/useSeries"
import NavBar from "./components/NavBar/NavBar"
import Home from "./pages/Home/Home"
import Sobre from "./pages/Sobre/Sobre"
import SerieForm from "./components/SerieForm/SerieForm"
import SerieList from "./components/SerieList/SerieList"
import { Routes, Route } from "react-router-dom"

function App() {
  const { series, addSerie, editSerie, removeSerie } = useSeries()

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />

        {/* CRIAR */}
        <Route
          path="/SerieForm"
          element={<SerieForm onAdd={addSerie} />}
        />

        {/* EDITAR */}
        <Route
          path="/edit/:id"
          element={
            <SerieForm
              series={series}
              onEdit={editSerie}
            />
          }
        />

        {/* LISTA */}
        <Route
          path="/SerieList"
          element={
            <SerieList
              series={series}
              onDelete={removeSerie}
            />
          }
        />
      </Routes>
    </>
  )
}  
export default App