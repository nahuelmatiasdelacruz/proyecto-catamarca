import React, { useEffect, useState } from "react";
import { MUI } from "../../../helpers/MaterialUI";
import "../../../styles/styles.css";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { getEmpleadosByQuery } from "./funcionesRegistros";


const StepOne = () => {
  const [open, setOpen] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChangeQuery = (e) => {
    const inputText = e.target.value;
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTypingTimeout = setTimeout(async () => {
      setLoading(true);
      try {
        if (inputText !== '') {
          const empleadosEncontrados = await getEmpleadosByQuery(inputText);
          console.log(empleadosEncontrados);
          setEmpleados(empleadosEncontrados);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }, 1000);
    setTypingTimeout(newTypingTimeout);
  };
  useEffect(() => {
    if (!open) {
      setEmpleados([]);
    }
  }, [open]);
  return (
    <React.Fragment>
      <h3 className="title-step">Comience escribiendo el apellido o CUIL de un empleado</h3>
      <MUI.Inputs.Autocomplete
        sx={{ width: 300, marginTop: '30px' }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
          setEmpleados([]);
        }}
        getOptionLabel={(option) => {
          return `${option.apellidos} ${option.nombres}`;
        }}
        options={empleados}
        loading={loading}
        renderInput={(params) => (
          <MUI.Inputs.TextField
            onChange={handleChangeQuery}
            {...params}
            label="Escriba CUIL o Apellido"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <MUI.Feedback.CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </React.Fragment>
  );
};
const StepTwo = ({}) => {
    return(
        <MapContainer
            style={{ height: "500px", width: "400px" }}
            center={[-28.465866, -65.781531]}
            zoom={14}
            scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-28.465866, -65.781531]}>
                <Popup>
                    Posición de fichado
                </Popup>
            </Marker>
        </MapContainer>
    )
}
const StepThree = ({}) => {

}
const steps = [
    {
        label: "Empleado",
        description: "Seleccione el empleado",
        component: <StepOne/>
    },
    {
        label: "Mapa",
        description: "Defina el lugar de ingreso o egreso",
        component: <StepTwo/>
    },
    {
        label: "Datos adicionales",
        description: "Complete los datos adicionales",
        component: <StepThree/>
    },
]
export const ModalNuevaMarcacion = ({ setNuevaMarcacion, datosMarcacion }) => {

    return (
        <>
          <h2 className="title-modal">Agregar nueva marcación</h2>
          <HorizontalLinearStepper/>
        </>
    );
};
function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
    return (
      <MUI.Layout.Box sx={{ width: '100%', height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <div>
          <MUI.Nav.Stepper sx={{height: "90%"}} activeStep={activeStep}>
            {steps.map((step, index) => {
              return (
                <MUI.Nav.Step sx={{height: "100%", width: "100%"}} key={index}>
                  <MUI.Nav.StepLabel>{step.description}</MUI.Nav.StepLabel>
                  <MUI.Nav.StepContent sx={{marginTop: "20px"}}>
                      <MUI.Layout.Box sx={{marginTop: "20px"}}>
                          {step.component}
                      </MUI.Layout.Box>
                  </MUI.Nav.StepContent>
                </MUI.Nav.Step>
              );
            })}
          </MUI.Nav.Stepper>
        </div>
        <div>
        {activeStep === steps.length ? (
          <React.Fragment>
            <MUI.Display.Typography sx={{ mt: 2, mb: 1 }}>
              Has completado la marcación
            </MUI.Display.Typography>
            <MUI.Layout.Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <MUI.Layout.Box sx={{ flex: '1 1 auto' }} />
              <MUI.Buttons.Button onClick={handleReset}>Realizar otra marcación</MUI.Buttons.Button>
            </MUI.Layout.Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <MUI.Layout.Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <MUI.Buttons.Button
                color="primary"
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atrás
              </MUI.Buttons.Button>
              <MUI.Layout.Box sx={{ flex: '1 1 auto' }} />
              <MUI.Buttons.Button variant="outlined" color="success" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
              </MUI.Buttons.Button>
            </MUI.Layout.Box>
          </React.Fragment>
        )}
        </div>
      </MUI.Layout.Box>
    );
  }