//react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom"
//Paginas y rutas
import Header from "./Components/common/Header"
import Footer from "./Components/common/Footer"



function App() {
  

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
