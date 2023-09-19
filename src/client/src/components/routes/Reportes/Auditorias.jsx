import React from 'react'
import HeadAudit from "../../../img/head_audit.png";

export const Auditorias = () => {
  return (
    <React.Fragment>
      <div className="index-header">
          <div className="employees-container">
            <img className="head-admin" src={HeadAudit} alt="Auditoría"/>
          </div>
          <div className="welcome-container">
            <div className="welcome-texts">
              <h2>Auditoría de registros</h2>
              <p>Administre los registros del sistema</p>
            </div>
          </div>
      </div>
      <div className="main-area-content">

      </div>
    </React.Fragment>
  )
}
