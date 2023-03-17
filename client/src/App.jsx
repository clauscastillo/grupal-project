import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Access from './views/Access'
import AddService from './views/AddService'
import Home from './views/Home'
import Inbox from './views/Inbox'
import Index from './views/Index'
import NotFound from './views/NotFound'
import Service from './views/Service'
import SignupLogin from './views/SignupLogin'
import Status from './views/Status'
import Header from './components/Header'
import Footer from './components/Footer'
import Panel from './views/Panel'
import PrivateRoute from './components/PrivateRoute'

const App = () => {


  return (
    <div className="App">
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          <Route path='/' element={<Index />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/register' element={<SignupLogin />}></Route>
          <Route path='/addservice' element={<AddService />}></Route>
          <Route path='/service/:id' element={<Service />}></Route>
          <Route path='/inbox' element={<Inbox />}></Route>
          {/* <Route path='/status/:id' element={<Status/>}></Route> */}
          <Route path='/access' element={<Access />}></Route>
          <Route path='/panel' element={<Panel />}></Route>
          <Route path='*' element={<NotFound />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path='/todasseries' element={<Status />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App
