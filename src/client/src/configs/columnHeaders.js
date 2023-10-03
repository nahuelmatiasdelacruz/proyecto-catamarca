import { MUI } from "../helpers/MaterialUI"

export const realTimeColumns = [
    {
        field: "nombre_completo_agente",
        headerName: "Agente",
        width: 200,
        editable: false
    },
    {
        field: "marca_modelo_dispositivo",
        headerName: "Dispositivo",
        width: 220,
        editable: false,
    },
    {
        field: "marcacion_tipo",
        headerName: "Tipo",
        width: 110,
        editable: false,
        renderCell: (params)=>{
            if(params.row.marcacion_tipo === "A"){
                return (
                    <>
                        <MUI.Display.Chip label="Automático" color="info"/>
                    </>
                )
            }else{
                return (
                    <>
                        <MUI.Display.Chip label="Manual" color="warning"/>
                    </>
                )
            }
        }
    },
    {
        field: "dentro_zona",
        headerName: "En zona",
        width: 100,
        editable: false,
        renderCell: (params)=>{
            if(params.row.dentro_zona === 1){
                return(
                    <>
                        <MUI.Display.Chip label="Si" color="success"/>
                    </>
                )
            }else{
                return(
                    <>
                        <MUI.Display.Chip label="No" color="warning"/>
                    </>
                )
            }
        }
    },
    {
        field: "direccion",
        headerName: "Ubicación",
        width: 400,
        editable: false,
    },
    {
        field: "google_link",
        headerName: "Mapa",
        width: 110,
        editable: false,
        renderCell: (params)=>{
            const goToLocation = () => {
                const url = `https://maps.google.com/?q=${params.row.latitud},${params.row.longitud}`;
                window.open(url,"_blank");
            }
            return(
                <>
                    <MUI.Buttons.IconButton onClick={goToLocation} color="info">
                        <MUI.Icons.LocationOnIcon/>
                    </MUI.Buttons.IconButton>
                </>
            )
        }
    },
    {
        field: "sentido",
        headerName: "Sentido",
        width: 160,
        editable: false,
        renderCell: (params)=>{
            if(params.row.sentido === "E"){
                return (
                    <>
                        <MUI.Display.Chip sx={{padding: "4px", width: "80%"}} icon={<MUI.Icons.LoginIcon fontSize="small"/>} color="success" label="Entrada"/>
                    </>
                )
            }else{
                return(
                    <>
                        <MUI.Display.Chip sx={{padding: "4px", width: "80%"}} icon={<MUI.Icons.LogoutIcon fontSize="small"/>} color="warning" label="Salida"/>
                    </>
                )
            }
        }
    },
    {
        field: "fecha",
        headerName: "Fecha",
        width: 120,
        editable: false,
    },
    {
        field: "hora",
        headerName: "Hora",
        width: 150,
        editable: false
    }
];

export const manualColumns = [
    {
        field: "nombre_completo_agente",
        headerName: "Agente",
        width: 200,
        editable: false
    },
    {
        field: "marca_modelo_dispositivo",
        headerName: "Dispositivo",
        width: 220,
        editable: false,
    },
    {
        field: "marcacion_tipo",
        headerName: "Tipo",
        width: 110,
        editable: false,
        renderCell: ()=>{
            return(
                <MUI.Display.Chip label="Manual" color="warning"/>
            )
        }
    },
    {
        field: "dentro_zona",
        headerName: "En zona",
        width: 100,
        editable: false,
        renderCell: (params)=>{
            if(params.row.dentro_zona === 1){
                return(
                    <>
                        <MUI.Display.Chip label="Si" color="success"/>
                    </>
                )
            }else{
                return(
                    <>
                        <MUI.Display.Chip label="No" color="warning"/>
                    </>
                )
            }
        }
    },
    {
        field: "direccion",
        headerName: "Ubicación",
        width: 400,
        editable: false,
    },
    {
        field: "google_link",
        headerName: "Mapa",
        width: 110,
        editable: false,
        renderCell: (params)=>{
            const goToLocation = () => {
                const url = `https://maps.google.com/?q=${params.row.latitud},${params.row.longitud}`;
                window.open(url,"_blank");
            }
            return(
                <>
                    <MUI.Buttons.IconButton onClick={goToLocation} color="info">
                        <MUI.Icons.LocationOnIcon/>
                    </MUI.Buttons.IconButton>
                </>
            )
        }
    },
    {
        field: "sentido",
        headerName: "Sentido",
        width: 160,
        editable: false,
        renderCell: (params)=>{
            if(params.row.sentido === "E"){
                return (
                    <>
                        <MUI.Display.Chip sx={{padding: "4px", width: "80%"}} icon={<MUI.Icons.LoginIcon fontSize="small"/>} color="success" label="Entrada"/>
                    </>
                )
            }else{
                return(
                    <>
                        <MUI.Display.Chip sx={{padding: "4px", width: "80%"}} icon={<MUI.Icons.LogoutIcon fontSize="small"/>} color="warning" label="Salida"/>
                    </>
                )
            }
        }
    },
    {
        field: "fecha",
        headerName: "Fecha",
        width: 120,
        editable: false,
    },
    {
        field: "hora",
        headerName: "Hora",
        width: 150,
        editable: false
    }
];

export const employeeColumns = [
    {
        field: "apellidos",
        headerName: "Apellido",
        width: 200,
        editable: false
    },
    {
        field: "nombres",
        headerName: "Nombre",
        width: 200,
        editable: false
    },
    {
        field: "documento",
        headerName: "CUIL",
        width: 220,
        editable: false
    },
    {
        field: "fecha_nacimiento",
        headerName: "Fecha de nacimiento",
        width: 170,
        editable: false
    },
]