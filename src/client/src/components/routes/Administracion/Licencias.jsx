import React from 'react'
import HeadLicenceManagement from "../../../img/head_licence_management.png";

export const Licencias = () => {
  return (
    <React.Fragment>
      <div className="index-header">
          <div className="employees-container">
            <img className="head-admin" src={HeadLicenceManagement} alt="Licencias"/>
          </div>
          <div className="welcome-container">
            <div className="welcome-texts">
              <h2>Gestión de tipos y licencias</h2>
              <p>Administre, de de alta, baja o modifique los tipos de licencias de los empleados</p>
            </div>
          </div>
      </div>
      <div className="main-area-content">

</div>
    </React.Fragment>
  )
}
