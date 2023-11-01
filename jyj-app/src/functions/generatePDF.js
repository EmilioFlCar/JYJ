import jsPDF from 'jspdf';
import 'jspdf-autotable';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import calcularDias from './calcularDias';

function total(items) {
    let result = 0
    items.forEach((item) => {
        result = result + (item.itemInfo.price * parseInt(item.itemsToRent)) * calcularDias(item.startDate, item.endDate)
    })
    return result
}

function generatePDF(invoice) {
    const doc = new jsPDF();

    // Configura el título y la fuente
    doc.setFontSize(20);
    doc.text('J & J EQUIPOS', 100, 10, 'center');
    doc.addImage("../../public/assets/Logo.png", "PNG", 10, 5, 29, 29);
    doc.setFontSize(10);
    doc.text('ALQUILER DE EQUIPOS PARA LA CONTRUCCIÓN', 100, 15, 'center');
    doc.text('Administrador: Julio Ortíz Padilla CC 78.710.362 de Montería', 100, 19, 'center');
    doc.text('Calle 13 N° 14B - 141 Barrio 6 de Marzo - Montería', 100, 23, 'center');
    doc.text('Celular: 3104693329 - 3128899231 - 3042113439', 100, 27, 'center');
    doc.text('Email: jyjequipos@gmail.com', 100, 31, 'center');

    // Datos del cliente
    doc.setFontSize(12);
    doc.text(`Factura N°: ${invoice.id || ''}`, 10, 45);
    doc.text(`Cliente: ${invoice.Client.name || ''}`, 10, 50);
    doc.text(`Cédula: ${invoice.Client.id || ''}`, 10, 55);
    doc.text(`Número de Teléfono: ${invoice.Client.phoneNumber || ''}`, 10, 60);
    doc.text(`Email: ${invoice.Client.email || ''}`, 10, 65);
    doc.text(`Dirección: ${invoice.Client.address || ''}`, 10, 70);

    // Detalles de la factura
    const data = [];
    invoice.Rents.forEach((rent) => {
        const equipment = rent.Equipment[0];
        data.push([
            rent.id,
            equipment.name,
            equipment.price,
            rent.rentedQuantity,
            rent.days,
            rent.cost,
        ]);
    });

    // Crear una tabla con los detalles
    doc.autoTable({
        head: [['ID', 'EQUIPO', 'UNIDAD', 'CANTIDAD', 'DÍAS', 'SUMA']],
        body: data,
        startY: 80,
    });

    // Total
    doc.text(`Total: ${invoice.total || ''}`, 160, doc.autoTable.previous.finalY + 10);

    // Generar el PDF
    doc.output('dataurlnewwindow');

}



export default generatePDF;
