import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MainLayout } from './layouts/main.layout.tsx'
import { ContainersPage } from './pages/containers.page.tsx'
import { NetworksPage } from './pages/networks.page.tsx'
import { GroupsPage } from './pages/groups.page.tsx'
import { HomePage } from './pages/home.page.tsx'
import { LoginPage } from './pages/login.page.tsx'
import { AuthLayout } from './layouts/auth.layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/containers' element={<ContainersPage />} />        
          <Route path='/networks' element={<NetworksPage />} />  
          <Route path='/groups' element={<GroupsPage />} />      
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />      
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
