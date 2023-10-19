function obtenerFechaHastaT(fechaISO) {
  const fechaOriginal = new Date(fechaISO);
  const opcionesDeFormato = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const fechaFormateada = fechaOriginal.toLocaleDateString(undefined, opcionesDeFormato);
  return fechaFormateada
}

export default obtenerFechaHastaT