import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route, renderMatches } from "react-router-dom"
import React, { Component} from "react"
import Auth from "./components/Auth"
import Dashboard from "./components/Navbar"


class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     loggedInStatus: "NOT_LOGGED_IN",
  //     user: {}
  //   }
  // };
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
// function App() {
  
//   renderMatches()
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Auth />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

export default App