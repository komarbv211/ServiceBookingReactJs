import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import ServiceTable from './components/ServiceTable'
import About from './components/About'
function App() {

  return (
    <>
      {/* <Layout /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<ServiceTable />} />
              <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
