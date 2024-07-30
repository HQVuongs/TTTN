import React, { Fragment } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from "./routes"
import DefaultComponent from './components/DefaultComponent/DefaultComponent'

function App() {


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