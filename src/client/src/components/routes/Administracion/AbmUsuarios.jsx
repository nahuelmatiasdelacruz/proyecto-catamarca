import React from 'react'
import HeadUserManagement from "../../../img/head_user_management.png";

export const AbmUsuarios = () => {
  return (
    <React.Fragment>
      <div className="index-header">
            <div className="employees-container">
              <img className="head-admin" src={HeadUserManagement} alt="Calendario"/>
            </div>
            <div className="welcome-container">
              <div className="welcome-texts">
                <h2>Administración de empleados</h2>
                <p>Administre, de de alta, baja o modifique los usuarios asociados al sistema</p>
              </div>
            </div>
        </div>
        <div className="main-area-content">

</div>
    </React.Fragment>
  )
}
