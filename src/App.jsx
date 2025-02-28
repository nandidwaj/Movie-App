import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'
import {BrowserRouter , Routes,Route} from "react-router-dom"
function App() {

  return (
    <>
    <div className='app'>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path ="/" element={<Home/>}/>
          <Route path ="/favorites" element={<Favorites/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
