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
import DMWEntry from './pages/MilkMasterModulePage/DMWEntryPage'
import DMWReport from './pages/MilkMasterModulePage/DMWReportPage'
import ItemEntry from './pages/ItemModulePage/ItemEntryPage'
import ItemInventry from './pages/ItemModulePage/ItemInventryPage'
import ShareDetails from './pages/SharePage/ShareDetailsPage'
import ShareRate from './pages/SharePage/ShareRatePage'
import ShareCream from './pages/SharePage/ShareCreamPage'
import ShareGhee from './pages/SharePage/ShareGheePage'
import CreationUserPage from './pages/CreationUserPage/CreationUserPage'
import AssignUserRolePage from './pages/CreationUserPage/AssignUserRolePage'
import HostelPage from './pages/HostelMasterPage/HostelPage'
import MilkCollection from './pages/MilkMasterModulePage/MilkcollectionPage'
import Hostel from './pages/HostelMasterPage/HostelPage'
import DtmMilkCollection from './pages/DTMMilkPage/DtmMilkCollectionPage'
import DtmMilkSale from './pages/DTMMilkPage/DtmMIlkSalePage'
import GheeEntryPage from './pages/GheeModulePage/GheeEntryPage'

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />

          <Route path='/createuser' element={<CreationUserPage/>} />
          <Route path='/assignuserrole' element={<AssignUserRolePage/>} />


          <Route path='/dashboardpage' element={<DashboardPage/>} />
          <Route path='/productentry' element={<ProductEntryPage/>} />
          <Route path='/productsales' element={<ProductSalesPage/>} />
          <Route path='/productreport' element={<ProductReportPage/>} />

          <Route path='/milksalemaster' element={<MilkMasterPage/>} />
          <Route path='/milksale' element={<MilkSalePage/>} />
          <Route path='/milkreport' element={<MilkReportPage/>} />
          <Route path="/dmwentry" element={<DMWEntry/>} />
          <Route path='/dmwreport' element={<DMWReport/>}/>
          <Route path='/Hostel' element={<Hostel/>}/>
          <Route path='/dtmmilksale' element={<DtmMilkSale/>}/>
          <Route path='/dtmmilkcollection' element={<DtmMilkCollection/>}/>

          <Route path='/itementry' element={<ItemEntry/>}/>
          <Route path='/iteminventry' element={<ItemInventry/>}/>

          <Route path='/sharedetails' element={<ShareDetails/>}/>
          <Route path='/sharerate' element={<ShareRate/>}/>
          <Route path='/sharecream' element={<ShareCream/>}/>
          <Route path='/shareghee' element={<ShareGhee/>}/>

          <Route path='/hostel' element={<HostelPage/>}/>
          <Route path="/milkcollection" element={<MilkCollection/>}/>


          <Route path="/gheeentry" element={<GheeEntryPage/>}/>


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App