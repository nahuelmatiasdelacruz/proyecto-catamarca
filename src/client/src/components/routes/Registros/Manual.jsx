import React from 'react'
import HeadManual from "../../../img/head_registry_manual.png";

export const Manual = () => {
  return (
    <React.Fragment>
      <div className="index-header">
          <div className="employees-container">
            <img className="head-admin" src={HeadManual} alt="Calendario"/>
          </div>
          <div className="welcome-container">
            <div className="welcome-texts">
              <h2>Registro manual</h2>
              <p>Administración manual de los registros del sistema</p>
            </div>
          </div>
      </div>
      <div className="main-area-content">

      </div>
    </React.Fragment>
  )
}
