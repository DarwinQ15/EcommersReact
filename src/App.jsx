import { useState, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import NewProduct from './pages/NewProduct'
import MyNav from './components/MyNav'
import LoadingScreen from './components/LoadingScreen'
import {useSelector, useDispatch} from 'react-redux'
import { getProductsThunk } from './store/slices/products.slice'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const isLoading = useSelector((state) => state.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsThunk());
}, [])

  return (
    <div>
      <HashRouter>
        {isLoading && <LoadingScreen />}
        <MyNav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new/:id' element={<NewProduct />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/products' element={<Products />} />
          </Route>
        </Routes>
      </HashRouter>
    </div> 
  )
}

//jonh@gmail.com correo

export default App
