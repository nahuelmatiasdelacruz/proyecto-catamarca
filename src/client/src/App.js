import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from "react";
import "./styles/styles.css";
import {TiempoReal, Manual, Calendario, Login, Index, Main, Empleados, Dispositivos, Espacios, Estadisticas, Auditorias, AbmUsuarios, Licencias, SolicitudLicencias } from "./components/routes/index.js";

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
            <Route exact path="/espacios" element={<Espacios/>}/>
            <Route exact path="/solicitud-licencias" element={<SolicitudLicencias/>}/>

            {/* REGISTROS */}
            <Route exact path="/registros/tiempo-real" element={<TiempoReal/>}/>
            <Route exact path="/registros/manual" element={<Manual/>}/>
            <Route exact path="/registros/calendario" element={<Calendario/>}/>

            {/* ADMINISTRACIÓN */}
            <Route exact path="/administracion/usuarios" element={<AbmUsuarios/>}/>
            <Route exact path="/administracion/licencias" element={<Licencias/>}/>

            {/* REPORTES */}
            <Route exact path="/reportes/estadisticos" element={<Estadisticas/>}/>
            <Route exact path="/reportes/auditoria" element={<Auditorias/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
