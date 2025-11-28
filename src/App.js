import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannersContextProvider from "./context/bannersContext";
import ChannelsContextProvider from "./context/channelContext";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
   
    return (
      <HashRouter>
              <ChannelsContextProvider>
            <BannersContextProvider>
                  <Suspense fallback={loading}>
                    <Routes>
                      <Route exact path="/login" name="Login Page" element={<Login />} />
                      <Route exact path="/register" name="Register Page" element={<Register />} />
                      <Route exact path="/404" name="Page 404" element={<Page404 />} />
                      <Route exact path="/500" name="Page 500" element={<Page500 />} />
                      <Route path="*" name="Home" element={<DefaultLayout />} />
                    </Routes>
                  </Suspense>
              <ToastContainer rtl />
          </BannersContextProvider>
            </ChannelsContextProvider>
        </HashRouter>
    )
  }
}

export default App
