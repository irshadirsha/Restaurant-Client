import React from 'react'
import { BrowserRouter ,Routes,Route} from "react-router-dom"
import HomePage from './Pages/HomePage'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
