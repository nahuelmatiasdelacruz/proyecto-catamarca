import React from 'react'
import HeadEspacios from "../../../img/head_espacios.png";

export const Espacios = () => {
  return (
    <React.Fragment>
      <div className="index-header">
            <div className="employees-container">
              <img className="head-admin" src={HeadEspacios} alt="Espacios"/>
            </div>
            <div className="welcome-container">
              <div className="welcome-texts">
                <h2>Administración de espacios</h2>
                <p>Gestione y configure los espacios de trabajo e ingreso de los empleados</p>
              </div>
            </div>
        </div>
        <div className="main-area-content">

        </div>
    </React.Fragment>
  )
}
