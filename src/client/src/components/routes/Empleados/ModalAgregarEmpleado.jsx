import React, { useState } from 'react'
import { MUI } from '../../../helpers/MaterialUI'
import "../../../styles/styles.css";

export const ModalAgregarEmpleado = ({setDatos,datos}) => {

  return (
    <>
        <h2 className="title-modal">Agregar empleado</h2>
        <MUI.Layout.Box sx={{marginTop: "40px"}}>
            <MUI.Inputs.TextField size="small" placeholder='Nombre'/>
        </MUI.Layout.Box>
        <MUI.Layout.Box sx={{marginTop: "10px"}}>
            <MUI.Inputs.TextField size="small" placeholder='Apellido'></MUI.Inputs.TextField>
        </MUI.Layout.Box>
        <MUI.Layout.Box sx={{marginTop: "10px"}}>
            <MUI.Inputs.TextField size="small" placeholder='CUIL'/>
        </MUI.Layout.Box>
        <MUI.Layout.Box sx={{marginTop: "10px"}}>
            <MUI.Inputs.TextField size="small" placeholder='Fecha de nacimiento'></MUI.Inputs.TextField>
        </MUI.Layout.Box>
        <MUI.Layout.Box sx={{marginTop: "40px"}}>
            <MUI.Buttons.Stack direction="row" spacing={4}>
                <MUI.Buttons.Button variant="contained" color="success">Confirmar</MUI.Buttons.Button>
                <MUI.Buttons.Button variant="contained" color="error">Cancelar</MUI.Buttons.Button>
            </MUI.Buttons.Stack>
        </MUI.Layout.Box>
    </>
  )
}