import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import ServiceTable from './components/ServiceTable'
import About from './components/About'
import ServiceInfo from './components/ServiceInfo'
import CreateService from './components/CreateService'
import EditService from './components/EditService'
import { LikeProvider } from './context/LikeContext';
import FavoritesPage from './components/FavoritesPage'
function App() {

  return (
    <>
    <LikeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<ServiceTable />} />
              <Route path="services/:id" element={<ServiceInfo />} />
              <Route path="/services/create" element={<CreateService />} />
              <Route path="/services/update/:id" element={<EditService />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LikeProvider>
    </>
  )
}

export default App
