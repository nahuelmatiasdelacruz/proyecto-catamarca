import React from 'react'
import HeadDevices from "../../img/head_devices.png";

export const Dispositivos = () => {
  return (
    <React.Fragment>
        <div className="index-header">
            <div className="employees-container">
              <img className="head-admin" src={HeadDevices} alt="Dispositivos"/>
            </div>
            <div className="welcome-container">
              <div className="welcome-texts">
                <h2>Administración de dispositivos</h2>
                <p>Gestión y configuración de dispositivos. Altas, bajas, configuraciones generales.</p>
              </div>
            </div>
        </div>
    </React.Fragment>
  )
}
