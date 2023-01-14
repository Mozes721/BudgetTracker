import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import React, { Component} from "react"
import Auth from "../src/components/authentication/Auth"
import Dashboard from "./components/dashboard/Dashboard"


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App