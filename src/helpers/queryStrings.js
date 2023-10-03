const {knex} = require("../configs/db");
const { formatOnlyDate } = require("./controllersHelpers");

const queryMarcacionesGenerales = `
  SELECT
      TO_CHAR(marcaciones.fecha, 'DD-MM-YYYY') AS fecha,
      TO_CHAR(marcaciones.fecha, 'HH24:MI') AS hora,
      marcaciones.id,
      marcaciones.sentido,
      marcaciones.dentro_zona,
      marcaciones.marcacion_tipo,
      marcaciones.latitud,
      marcaciones.longitud,
      marcaciones.direccion,
      agentes.apellidos || ' ' || agentes.nombres AS nombre_completo_agente,
      dispositivos.marca || ' ' || dispositivos.modelo AS marca_modelo_dispositivo
  FROM
      sigap.marcaciones
  JOIN
      sigap.agentes ON marcaciones.id_agente = agentes.id
  JOIN
      sigap.dispositivos ON marcaciones.id_dispositivo = dispositivos.id
  WHERE
      sigap.marcaciones.registro_activo = 1
  ORDER BY
      TO_DATE(fecha, 'DD-MM-YYYY') DESC;
`;
const queryMarcacionesById = async (id) => {
    let queryParams = {
      registro_activo: 1,
      id_agente: id
    }
    const data = await knex.select("id","fecha","sentido","dentro_zona","marcacion_tipo","latitud","longitud")
      .from("sigap.marcaciones")
      .where(queryParams);
    return data;
}
const queryMarcacionesByDate = async (id,date) => {
  const formatedDate = formatOnlyDate(date);
  const data = await knex.select("id","fecha","sentido","dentro_zona","marcacion_tipo","latitud","longitud")
  .from("sigap.marcaciones")
  .where({registro_activo: 1, id_agente: id})
  .andWhereBetween("fecha",[formatedDate.start,formatedDate.end]);
  return data;
}
module.exports = {
    queryMarcacionesById,
    queryMarcacionesByDate,
    queryMarcacionesGenerales
}