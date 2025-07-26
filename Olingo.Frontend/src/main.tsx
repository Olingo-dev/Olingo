import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from '@/pages/home'
import MainLayout from './layouts/main.layout'
import CreateContainer from './pages/create'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home/>}/>
          </Route>
          <Route path='containers' element={<MainLayout />}>
            <Route path='create' element={<CreateContainer />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
