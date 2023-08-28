import React from 'react'
import Employees from "../img/employees2.png";
import { MUI } from '../helpers/MaterialUI';
export const Index = () => {
  return (
    <React.Fragment>
      <div className="index-header">
        <div className="employees-container">
          <img src={Employees} alt="Empleados"/>
        </div>
        <div className="welcome-container">
          <div className="welcome-texts">
            <h2>Bienvenido/a, Administrador</h2>
            <p>En este dashboard, podrá tener acceso rápido a los datos de los empleados</p>
          </div>
          <div className="welcome-buttons">
            <button type="button" className="button-administrar">Comenzar administración</button>
          </div>
        </div>
      </div>
      <div className="index-main">
        <div className="cards-container">
          <div className="index-card">
            <div className="card-icon">
              <MUI.Icons.AccountCircleIcon sx={{color: "#3f97d5ff", fontSize: "50px"}}/>
            </div>
            <h3>23.899</h3>
            <p>Empleados On-Site</p>
          </div>
          <div className="index-card">
            <div className="card-icon">
              <MUI.Icons.PersonOffIcon fontSize='large' sx={{color: "#dd5252", fontSize: "50px"}}/>
            </div>
            <h3>2.367</h3>
            <p>Empleados ausentes</p>
          </div>
          <div className="index-card">
            <div className="card-icon">
              <MUI.Icons.MedicalInformationIcon fontSize='large' sx={{color: "#bfd400", fontSize: "50px"}}/>
            </div>
            <h3>3.673</h3>
            <p>Empleados con licencia</p>
          </div>
          <div className="index-card">
            <div className="card-icon">
              <MUI.Icons.PeopleIcon fontSize='large' sx={{color: "#3f97d5ff", fontSize: "50px"}}/>
            </div>
            <h3>29.939</h3>
            <p>Empleados totales</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
