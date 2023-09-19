function obtenerFechaHastaT(fechaISO) {
    // Buscar la posición de la "T" en la cadena
    const indiceT = fechaISO.indexOf('T');
    
    // Comprobar si la cadena contiene la "T"
    if (indiceT !== -1) {
      // Extraer la parte de la fecha hasta la "T"
      return fechaISO.slice(0, indiceT);
    } else {
      // Si no se encuentra la "T", devolver la cadena original
      return fechaISO;
    }
  }

export default obtenerFechaHastaT