import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import DashboardPage from './pages/Dashboard/DashboardPage'
import ProductEntryPage from './pages/ProductModulePage/ProductEntryPage'
import ProductSalesPage from './pages/ProductModulePage/ProductSalesPage'
import ProductReportPage from './pages/ProductModulePage/ProductReportPage'
import MilkMasterPage from './pages/MilkMasterModulePage/MilkMasterPage'
import MilkSalePage from './pages/MilkMasterModulePage/MilkSalePage'
import MilkReportPage from './pages/MilkMasterModulePage/MilkReportPage'
import Table from './pages/MilkMasterModulePage/Table'
import TableReport from './pages/MilkMasterModulePage/TableReportPage'
import ItemEntry from './pages/ItemModulePage/ItemEntryPage'
import ItemInventry from './pages/ItemModulePage/ItemInventryPage'

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
          <Route path='/milksale' element={<MilkSalePage/>} />
          <Route path='/milkreport' element={<MilkReportPage/>} />
          <Route path="/table" element={<Table/>} />
          <Route path='/tablereport' element={<TableReport/>}/>

          <Route path='/itementry' element={<ItemEntry/>}/>
          <Route path='/iteminventry' element={<ItemInventry/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App