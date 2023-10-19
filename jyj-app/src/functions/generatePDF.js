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
    doc.text('JyJ', 100, 10, 'center');
    doc.setFontSize(10);
    doc.text('NIT: XXXXXXXXXX', 100, 15, 'center');

    // Datos del cliente
    doc.setFontSize(12);
    doc.text(`Factura N°: ${invoice.id || ''}`, 10, 25);
    doc.text(`Cliente: ${invoice.Client.name || ''}`, 10, 30);
    doc.text(`Cédula: ${invoice.Client.id || ''}`, 10, 35);
    doc.text(`Número de Teléfono: ${invoice.Client.phoneNumber || ''}`, 10, 40);
    doc.text(`Email: ${invoice.Client.email || ''}`, 10, 45);
    doc.text(`Dirección: ${invoice.Client.address || ''}`, 10, 50);

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
        startY: 60,
    });

    // Total
    doc.text(`Total: ${invoice.total || ''}`, 160, doc.autoTable.previous.finalY + 10);

    // Generar el PDF
    doc.output('dataurlnewwindow');

}



export default generatePDF;
