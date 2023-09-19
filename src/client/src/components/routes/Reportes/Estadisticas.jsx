import React from 'react'
import HeadStatistics from "../../../img/head_statistics.png";

export const Estadisticas = () => {
  return (
    <React.Fragment>
      <div className="index-header">
          <div className="employees-container">
            <img className="head-admin" src={HeadStatistics} alt="Auditoría"/>
          </div>
          <div className="welcome-container">
            <div className="welcome-texts">
              <h2>Estadísticas</h2>
              <p>Visualice las estadísticas del sistema, tales como registros de ingreso, etc.</p>
            </div>
          </div>
      </div>
      <div className="main-area-content">

      </div>
    </React.Fragment>
  )
}
