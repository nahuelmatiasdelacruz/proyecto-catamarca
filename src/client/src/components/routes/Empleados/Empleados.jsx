import React, { useEffect, useState } from 'react'
import HeadAdmin from "../../../img/head_admin.png";
import { employeeColumns } from '../../../configs/columnHeaders';
import { MUI } from '../../../helpers/MaterialUI';
import { stylesModal } from '../../../styles/componentStyles';
import { ModalAgregarEmpleado } from './ModalAgregarEmpleado';
import axios from 'axios';
import { server } from '../../../configs/constants';

export const Empleados = () => {
  const [empleados,setEmpleados] = useState([]);
  const [openEmpleado,setOpenEmpleado] = useState(false);
  const [dataEmpleadoNuevo,setDataEmpleadoNuevo] = useState({});
  const agregarEmpleado = () => {
    setOpenEmpleado(true);
  }
  const handleCloseAgregarEmpleado = () => {
    setOpenEmpleado(false);
    setDataEmpleadoNuevo({});
  }
  const getEmpleados = async () => {
    try{
      const result = await axios.get(`${server}/api/empleados`);
      setEmpleados(result.data);
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getEmpleados();
  },[])
  return (
    <React.Fragment>
        <MUI.Utils.Modal open={openEmpleado} onClose={handleCloseAgregarEmpleado}>
          <MUI.Layout.Box sx={stylesModal}>
            <ModalAgregarEmpleado datos={dataEmpleadoNuevo} setDatos={setDataEmpleadoNuevo}/>
          </MUI.Layout.Box>
        </MUI.Utils.Modal>
        <div className="index-header">
            <div className="employees-container">
              <img className="head-admin" src={HeadAdmin} alt="Empleados"/>
            </div>
            <div className="welcome-container">
              <div className="welcome-texts">
                <h2>Gestión de empleados</h2>
                <p>En este espacio, podrá gestionar los empleados, sus altas, licencias, bajas, etc.</p>
              </div>
            </div>
        </div>
        <div className="main-area-content">
          <MUI.MuiX.DataGrid
            rows={empleados}
            columns={employeeColumns}
            disableRowSelectionOnClick
            sx={{height: "90%"}}
            initialState={{
              sorting: {
                  sortModel: [{field: "apellidos", sort: "desc"}]
              }
          }}
          />
          <div>
            <MUI.Buttons.Button onClick={agregarEmpleado} sx={{marginTop: "20px"}} variant="outlined" color="success">Agregar empleado</MUI.Buttons.Button>
          </div>
        </div>
    </React.Fragment>
  )
}