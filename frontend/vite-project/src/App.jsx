
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/Login.jsx"
import Dashboard from './pages/Dashboard.jsx';
import Cadastro from "./pages/Cadastro.jsx";
function App(){

  



  return(
    <>

      <Router>

      <Routes>
        <Route path="/" element= {<Login/>} />
        <Route path="/login" element= {<Login/>} />
        <Route path="/dashboard" element = {<Dashboard/>} />
        <Route path="/cadastro" element = {<Cadastro/>} />
 
      </Routes>



      </Router>
    


    </>
  )
}

export default App
