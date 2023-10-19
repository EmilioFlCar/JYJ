function calcularDias(start, end) {
    const fecha1 = new Date(start);
    const fecha2 = new Date(end);
    const diferenciaEnMilisegundos = fecha2 - fecha1;
    const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    return diferenciaEnDias
}

export default calcularDias