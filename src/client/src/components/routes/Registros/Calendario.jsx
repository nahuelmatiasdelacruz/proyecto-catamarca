import React from 'react'
import HeadCalendar from "../../../img/head_calendar.png";

export const Calendario = () => {
  return (
    <React.Fragment>
      <div className="index-header">
          <div className="employees-container">
            <img className="head-admin" src={HeadCalendar} alt="Calendario"/>
          </div>
          <div className="welcome-container">
            <div className="welcome-texts">
              <h2>Calendario de registros</h2>
              <p>Visualice los registros de los empleados desde un calendario</p>
            </div>
          </div>
      </div>
      <div className="main-area-content">

      </div>
    </React.Fragment>
  )
}
