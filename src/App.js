import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import DashboardPage from './pages/Dashboard/DashboardPage'
import ProductEntryPage from './pages/ProductModulePage/ProductEntryPage'
import ProductSalesPage from './pages/ProductModulePage/ProductSalesPage'
import ProductReportPage from './pages/ProductModulePage/ProductReportPage'
import MilkMasterPage from './pages/MilkMasterModulePage/MilkMasterPage'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/dashboardpage' element={<DashboardPage/>} />
          <Route path='/productentry' element={<ProductEntryPage/>} />
          <Route path='/productsales' element={<ProductSalesPage/>} />
          <Route path='/productreport' element={<ProductReportPage/>} />

          <Route path='/milksalemaster' element={<MilkMasterPage/>} />


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App