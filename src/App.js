import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import DashboardPage from './pages/Dashboard/DashboardPage'
import ProductEntryPage from './pages/ProductModulePage/ProductEntryPage'
import ProductSalesPage from './pages/ProductModulePage/ProductSalesPage'
import ProdSalePageCopy from './pages/ProductModulePage/ProdSalePageCopy'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/dashboardpage' element={<DashboardPage/>} />
          <Route path='/productentry' element={<ProductEntryPage/>} />
          <Route path='/productsales' element={<ProductSalesPage/>} />
          <Route path='/prodsalecopy' element={<ProdSalePageCopy/>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App