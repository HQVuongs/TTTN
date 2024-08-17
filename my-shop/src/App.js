import React, { Fragment, useEffect } from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from "./routes"
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from './utils'
import { jwtDecode } from 'jwt-decode'
import * as UserService from "./services/UserService"
import {useDispatch} from 'react-redux'
import { updateUser } from './redux/slides/userSlide'

function App() {
  const dispatch = useDispatch ();
    useEffect(() => {
      const {storageData, decoded} = handleDecoded()
          if(decoded?.id) {
            handleGetDetailUser(decoded?.id, storageData)
        }

    }, [])

// VD 30

    const handleDecoded = () => {
      let storageData = localStorage.getItem('access_token')
      let decoded = {}
      if(storageData  && isJsonString(storageData)) {
          storageData = JSON.parse(storageData)
          decoded = jwtDecode(storageData)
      }
      return {decoded, storageData}
    }

    UserService.axiosJWT.interceptors.request.use(async (config) => {
      const currentTime = new Date()
      const { decoded } = handleDecoded()
      if(decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken()
        config.headers['token'] = `Bearer ${data?.access_token}`
      }
      return config;
    }, (err) => {
      return Promise.reject(err);
    });

    const handleGetDetailUser = async(id, token) => {
      const res = await UserService.getDetailUser(id, token)
      dispatch(updateUser({...res?.data, access_token: token}))
    }
    

  return (
    <div>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              // doan nay khi la neu isShowHeader la true thi sẽ hiện ra các thành phần có trong Default, ngược lại thì sẽ là fragment
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              )
            })}

          </Routes>
        </Router>
    </div>
  )
}

export default App