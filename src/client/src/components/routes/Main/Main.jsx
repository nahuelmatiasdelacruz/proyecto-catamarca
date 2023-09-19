import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Outlet} from "react-router-dom";
import Sidemenu from '../../Sidemenu/Sidemenu';

export const Main = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="main-app">
            <Sidemenu/>
            <div className="main-content">
                <Outlet/>
            </div>
        </div>
    </LocalizationProvider>
  )
}
