import React from 'react'
import HeadLicenceManagement from "../../../img/head_licence_management.png";

export const SolicitudLicencias = () => {
  return (
    <React.Fragment>
      <div className="index-header">
          <div className="employees-container">
            <img className="head-admin" src={HeadLicenceManagement} alt="Licencias"/>
          </div>
          <div className="welcome-container">
            <div className="welcome-texts">
              <h2>Gestión licencias</h2>
              <p>Administre, de de alta, baja o modifique las licencias</p>
            </div>
          </div>
      </div>
      <div className="main-area-content">

      </div>
    </React.Fragment>
  )
}
