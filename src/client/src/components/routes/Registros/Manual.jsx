import React, { useEffect,useState } from 'react'
import HeadManual from "../../../img/head_registry_manual.png";
import { MUI } from '../../../helpers/MaterialUI';
import { manualColumns } from '../../../configs/columnHeaders';
import { stylesModal, stylesModalMarcacionNueva } from '../../../styles/componentStyles';
import { ModalNuevaMarcacion } from './ModalNuevaMarcacion';
import { getMarcaciones } from './funcionesRegistros';

export const Manual = () => {
  const [nuevaMarcacion,setNuevaMarcacion] = useState({});
  const [marcacionesManuales,setMarcacionesManuales] = useState([]);
  const [openAgregar,setOpenAgregar] = useState(false);
  const handleCloseAgregar = () => {
    setOpenAgregar(false);
    setNuevaMarcacion({});
  }
  const agregarMarcacion = () => {
    setOpenAgregar(true);
  }
  
useEffect(()=>{
    getMarcaciones(setMarcacionesManuales);
},[]);
  return (
    <React.Fragment>
      <MUI.Utils.Modal open={openAgregar} onClose={handleCloseAgregar}>
        <MUI.Layout.Box sx={stylesModalMarcacionNueva}>
          <ModalNuevaMarcacion setNuevaMarcacion={setNuevaMarcacion}/>
        </MUI.Layout.Box>
      </MUI.Utils.Modal>
      <div className="index-header">
          <div className="employees-container">
            <img className="head-admin" src={HeadManual} alt="Calendario"/>
          </div>
          <div className="welcome-container">
            <div className="welcome-texts">
              <h2>Registro manual</h2>
              <p>Administración manual de los registros del sistema</p>
            </div>
          </div>
      </div>
      <div className="main-area-content">
        <MUI.MuiX.DataGrid
          rows={marcacionesManuales}
          columns={manualColumns}
          disableRowSelectionOnClick
          sx={{height: "90%"}}
          initialState={{
            sorting: {
                sortModel: [{field: "fecha", sort: "desc"}]
            }
        }}
        />
        <div>
          <MUI.Buttons.Button onClick={agregarMarcacion} sx={{marginTop: "20px"}} variant="outlined" color="success">Agregar marcación</MUI.Buttons.Button>
        </div>
      </div>
    </React.Fragment>
  )
}
