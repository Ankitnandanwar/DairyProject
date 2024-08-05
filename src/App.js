import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login'
import ErrorPage from './components/ErrorPage/ErrorPage'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import AssignUserRolePage from './pages/CreationUserPage/AssignUserRolePage'
import CreationUserPage from './pages/CreationUserPage/CreationUserPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import DtmMilkCollection from './pages/DTMMilkPage/DtmMilkCollectionPage'
import DtmMilkSale from './pages/DTMMilkPage/DtmMIlkSalePage'
import GheeEntryPage from './pages/GheeModulePage/GheeEntryPage'
import { default as Hostel, default as HostelPage } from './pages/HostelMasterPage/HostelPage'
import ItemEntry from './pages/ItemModulePage/ItemEntryPage'
import ItemInventry from './pages/ItemModulePage/ItemInventryPage'
import DMWEntry from './pages/MilkMasterModulePage/DMWEntryPage'
import DMWReport from './pages/MilkMasterModulePage/DMWReportPage'
import MilkCollection from './pages/MilkMasterModulePage/MilkcollectionPage'
import MilkMasterPage from './pages/MilkMasterModulePage/MilkMasterPage'
import MilkReportPage from './pages/MilkMasterModulePage/MilkReportPage'
import MilkSalePage from './pages/MilkMasterModulePage/MilkSalePage'
import ProductEntryPage from './pages/ProductModulePage/ProductEntryPage'
import ProductReportPage from './pages/ProductModulePage/ProductReportPage'
import ProductSalesPage from './pages/ProductModulePage/ProductSalesPage'
import ShareCream from './pages/SharePage/ShareCreamPage'
import ShareDetails from './pages/SharePage/ShareDetailsPage'
import ShareGhee from './pages/SharePage/ShareGheePage'
import ShareRate from './pages/SharePage/ShareRatePage'

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path='/createuser' element={<CreationUserPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/assignuserrole' element={<AssignUserRolePage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/dashboardpage' element={<DashboardPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/productentry' element={<ProductEntryPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/productsales' element={<ProductSalesPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/productreport' element={<ProductReportPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/milksalemaster' element={<MilkMasterPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/milksale' element={<MilkSalePage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/milkreport' element={<MilkReportPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dmwentry" element={<DMWEntry />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/dmwreport' element={<DMWReport />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/Hostel' element={<Hostel />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/dtmmilksale' element={<DtmMilkSale />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/dtmmilkcollection' element={<DtmMilkCollection />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/itementry' element={<ItemEntry />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/iteminventry' element={<ItemInventry />} />
          </Route>

          <Route path='/sharedetails' element={<ShareDetails />} />
          <Route path='/sharerate' element={<ShareRate />} />
          <Route path='/sharecream' element={<ShareCream />} />
          <Route path='/shareghee' element={<ShareGhee />} />

          <Route element={<PrivateRoute />}>
            <Route path='/hostel' element={<HostelPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/milkcollection" element={<MilkCollection />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/gheeentry" element={<GheeEntryPage />} />
          </Route>


          <Route path='/*' element={<ErrorPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App