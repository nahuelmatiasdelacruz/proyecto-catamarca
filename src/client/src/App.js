import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Login } from "./components/Login";
import { useState } from "react";
import "./styles/styles.css";
import { Index } from "./components/Index";
import { Main } from "./components/Main";
import { Empleados } from "./components/Empleados/Empleados";
import { Dispositivos } from "./components/Dispositivos/Dispositivos";

function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
          <Route exact path="/" element={<Main loggedIn={loggedIn}/>}>
            <Route index element={<Index/>}/>
            <Route exact path="/empleados" element={<Empleados/>}/>
            <Route exact path="/dispositivos" element={<Dispositivos/>}/>
            <Route exact path="/espacios" element={<Empleados/>}/>
            <Route exact path="/registros" element={<Empleados/>}/>
            <Route exact path="/administracion" element={<Empleados/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
