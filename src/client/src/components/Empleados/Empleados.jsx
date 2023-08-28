import React from 'react'
import HeadAdmin from "../../img/head_admin.png";

export const Empleados = () => {
  return (
    <React.Fragment>
        <div className="index-header">
            <div className="employees-container">
              <img className="head-admin" src={HeadAdmin} alt="Empleados"/>
            </div>
            <div className="welcome-container">
              <div className="welcome-texts">
                <h2>Gestión de empleados</h2>
                <p>En este espacio, podrá gestionar los empleados, sus altas, licencias, bajas, etc.</p>
              </div>
            </div>
        </div>
    </React.Fragment>
  )
}