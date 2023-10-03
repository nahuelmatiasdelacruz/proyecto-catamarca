import React, { useEffect, useState } from 'react'
import HeadRealTime from "../../../img/head_realtime.jpg";
import { MUI } from '../../../helpers/MaterialUI';
import { realTimeColumns } from '../../../configs/columnHeaders';
import {server} from "../../../configs/constants";
import axios from 'axios';

export const TiempoReal = () => {
  const [marcaciones,setMarcaciones] = useState([]);

  const getMarcaciones = async () => {
    try{
        const result = await axios.get(`${server}/api/marcaciones`);
        setMarcaciones(result.data);
    }catch(e){
        console.log(`Hubo un error al buscar las marcaciones: ${e.message}`);
    }
}
  useEffect(()=>{
    getMarcaciones();
  },[]);
  return (
    <React.Fragment>
      <div className="index-header">
            <div className="employees-container">
              <img className="head-admin" src={HeadRealTime} alt="Calendario"/>
            </div>
            <div className="welcome-container">
              <div className="welcome-texts">
                <h2>Registros en tiempo real</h2>
                <p>Visualice en tiempo real los registros de ingreso y egreso de los empleados</p>
              </div>
            </div>
        </div>
        <div className="main-area-content">
          <MUI.MuiX.DataGrid
            initialState={{
              sorting: {
                  sortModel: [{field: "fecha", sort: "desc"}]
              }
              }}
              columns={realTimeColumns}
              rows={marcaciones}
              disableRowSelectionOnClick
            />
        </div>
    </React.Fragment>
  )
}
