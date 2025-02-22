import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/style.scss';
import Dashboard from './pages/Dashboard.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/security/Login.tsx'
import RegisterAdministrator from './pages/security/RegisterAdministrator.tsx'
import { MainLayout } from './layouts/Layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path='security'>
        <Route path='login' element={<Login />}/>
        <Route path='register' element={ <RegisterAdministrator />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
