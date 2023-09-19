import React, { useState } from 'react'
import logo from "../../img/logo.png";
import { MUI } from '../../helpers/MaterialUI';
import AccountMenu from './AccountIcon';
import { useNavigate } from "react-router-dom";

const Sidemenu = () => {
  const navigate = useNavigate();
  const [subMenu,setSubMenu] = useState({
    registros: "hide",
    administracion: "hide",
    reportes: "hide"
  });
  const showMenu = (menu) => {
    if(subMenu[menu] === "hide"){
      const updatedSubMenu = {};
      for(const key in subMenu){
        updatedSubMenu[key] = key === menu ? "sub-menu" : "hide";
      }
      setSubMenu(updatedSubMenu);
      
    }else{
      setSubMenu({
        ...subMenu,
        [menu]:"hide"
      })
    }
  };
  const hideAll = () => {
    setSubMenu({
      registros: "hide",
      administracion: "hide",
      reportes: "hide"
    })
  }
  return (
    <div className="sidenav">
      <div onMouseLeave={()=>{hideAll()}} className="nav-main-content">
        <div className="logo-catamarca">
          <img src={logo} alt="Logo Catamarca"/>
        </div>
        <div className="buttons-container">
          <button onClick={()=>{navigate("/")}} className="menu-item">
            <MUI.Icons.DashboardIcon/>
            <span>Panel Central</span>  
          </button>
          <button onClick={()=>{navigate("/empleados")}} className="menu-item">
            <MUI.Icons.Person2Icon/>
            <span>Empleados</span>  
          </button> 
          <button onClick={()=>{navigate("/dispositivos")}} className="menu-item">
            <MUI.Icons.DevicesOtherIcon/>
            <span>Dispositivos</span>  
          </button>
          <button onClick={()=>{navigate("/espacios")}} className="menu-item">
            <MUI.Icons.PublicIcon/>
            <span>Espacios</span>  
          </button>
          <button onClick={()=>{showMenu("registros")}} className="menu-item">
            <MUI.Icons.DataThresholdingIcon/>
            <span>Registros</span>  
          </button>
          <div className={subMenu.registros}>
            <button onClick={()=>{navigate("/registros/tiempo-real")}}>Tiempo Real</button>
            <button onClick={()=>{navigate("/registros/manual")}}>Registro Manual</button>
            <button onClick={()=>{navigate("/registros/calendario")}}>Calendario por Empleado</button>
          </div>
          <button onClick={()=>{showMenu("administracion")}} className="menu-item">
            <MUI.Icons.ManageAccountsIcon/>
            <span>Administración</span>  
          </button>
          <div className={subMenu.administracion}>
            <button onClick={()=>{navigate("/administracion/usuarios")}}>ABM Usuarios</button>
            <button onClick={()=>{navigate("/administracion/licencias")}}>Tipos de Licencias</button>
          </div>
          <button onClick={()=>{navigate("/solicitud-licencias")}} className="menu-item">
            <MUI.Icons.BadgeIcon/>
            <span>Sol. de Licencias</span>  
          </button>
          <button onClick={()=>{showMenu("reportes")}} className="menu-item">
            <MUI.Icons.AssignmentIcon/>
            <span>Reportes</span>  
          </button>
          <div className={subMenu.reportes}>
            <button onClick={()=>{navigate("/reportes/estadisticos")}}>Estadisticos</button>
            <button onClick={()=>{navigate("/reportes/auditoria")}}>Auditoría de registros</button>
          </div>
        </div>
      </div>
      <div className="nav-footer">
        <p>{"Administrador"}</p>
        <button type="button" className="cerrar-sesion">Cerrar sesión</button>
      </div>
    </div>
  )
}

export default Sidemenu