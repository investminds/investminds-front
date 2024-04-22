import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Navbar from "./component/Navbar/Navbar"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"


function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Switch>
          <Route path='/' component={Home} exact>
            <Home />
          </Route>
          <Route path='/about' component={About} exact>
            <About />
          </Route>
          <Route path='/contact' component={Contact} exact>
            <Contact />
          </Route>
          <Route path='/login' component={Login} exact>
            <Login />
          </Route>
          <Route path='/signup' component={SignUp} exact>
            <SignUp />
          </Route>

        </Switch>
      </Router>
    </>
  )
}

export default App
