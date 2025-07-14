import Header from "./components/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Usuarios from "./pages/Usuarios"
import Cadastro from "./pages/Cadastro"
import { PhotoProvider } from "./providers/PhotoProvider"

function App() {
  return (
    <PhotoProvider>
      <BrowserRouter>
        <div>
          <Header />
          <main className="">
            <Routes>
              <Route path="/" element={<Usuarios />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </PhotoProvider>
  )
}

export default App
