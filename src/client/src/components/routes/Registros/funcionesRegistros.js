import axios from 'axios';
import { server } from '../../../configs/constants';

export const getMarcaciones = async (setData) => {
    try{
        const result = await axios.get(`${server}/api/marcaciones/manuales`);
        setData(result.data);
    }catch(e){
        console.log(e);
    }
}
export const addMarcacion = async (datosMarcacion) => {
    try{
        await axios.post(`${server}/api/marcaciones`);
    }catch(e){
        console.log(e);
    }
}

export const getEmpleadosByQuery = async (query) => {
    try{
        const result = await axios.get(`${server}/api/empleados/byquery?find=${query}`);
        return result.data;
    }catch(e){
        console.log(e);
    }
}